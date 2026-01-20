import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { getCountries, getPaymentMethods } from '@/entities/Payment';
import type { Countries, PaymentMethods } from '@/entities/Payment';
import { Selector } from '@/shared/ui/Selector/Selector';
import { Button } from '@/shared/ui';
import { useAddPayment } from '@/entities/Payment';
import { useNavigate } from 'react-router';

export const PaymentForm = () => {
  const [countries, setCountries] = useState<Countries>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentCountry, setCurrentCountry] = useState<string>('');
  const [currentCurrency, setCurrentCurrency] = useState<string>('');
  const [currentPayment, setCurrentPayment] = useState<string>('');
  const addPayment = useAddPayment();

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [countriesData, paymentsData] = await Promise.all([
          getCountries(),
          getPaymentMethods(),
        ]);
        setCountries(countriesData);
        setPaymentMethods(paymentsData);
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
    const payment = paymentMethods.find((payment) => payment.currency === currentCurrency);
    if (payment) {
      return payment.paymentMethods.map((method) => ({ value: method, text: method }));
    }

    return [];
  }, [paymentMethods, currentCurrency]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    addPayment({
      country: currentCountry,
      currency: currentCurrency,
      paymentMethod: currentPayment,
    });
    navigate('/payment-results');
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <form onSubmit={submitHandler}>
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

        <Button type="submit" disabled={!currentPayment}>
          Создать выплату
        </Button>
      </form>
    </>
  );
};
