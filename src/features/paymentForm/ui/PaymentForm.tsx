import { useEffect, useMemo, useState } from 'react';
import { getCountries, getPayments } from '../api';
import type { Countries, PaymentMethods } from '../model/types';
import { Selector } from '@/shared/ui/Selector/Selector';

export const PaymentForm = () => {
  const [countries, setCountries] = useState<Countries>([]);
  const [payments, setPayments] = useState<PaymentMethods>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentCountry, setCurrentCountry] = useState<string>('');
  const [currentCurrency, setCurrentCurrency] = useState<string>('');
  const [currentPayment, setCurrentPayment] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [countriesData, paymentsData] = await Promise.all([getCountries(), getPayments()]);
        setCountries(countriesData);
        setPayments(paymentsData);
      } catch (err) {
        setError(`Ошибка загрузки данных, ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const changeCountry = (countryCode: string) => {
    setCurrentCountry(countryCode);
    setCurrentCurrency('');
    setCurrentPayment('');
  };

  const changeCurrency = (currency: string) => {
    setCurrentCurrency(currency);
    setCurrentPayment('');
  };

  const countryOptions = useMemo(
    () => countries.map((country) => ({ value: country.code, text: country.name })),
    [countries],
  );
  const currencyOptions = useMemo(() => {
    const country = countries.find((country) => country.code === currentCountry);

    if (country) {
      return country.currency.map((currency) => ({ value: currency, text: currency }));
    }

    return [];
  }, [countries, currentCountry]);

  const paymentOptions = useMemo(() => {
    const payment = payments.find((payment) => payment.currency === currentCurrency);
    if (payment) {
      return payment.paymentMethods.map((method) => ({ value: method, text: method }));
    }

    return [];
  }, [payments, currentCurrency]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form>
      <Selector
        value={currentCountry}
        onChange={(e) => changeCountry(e.target.value)}
        placeholder="Страны"
        id="country"
        label="Выберите страну"
        options={countryOptions}
      />
      <Selector
        value={currentCurrency}
        onChange={(e) => changeCurrency(e.target.value)}
        placeholder="Валюты"
        id="currency"
        label="Выберите валюту"
        options={currencyOptions}
      />
      <Selector
        value={currentPayment}
        onChange={(e) => setCurrentPayment(e.target.value)}
        placeholder="Методы оплаты"
        id="payment-method"
        label="Выберите метод оплаты"
        options={paymentOptions}
      />
    </form>
  );
};
