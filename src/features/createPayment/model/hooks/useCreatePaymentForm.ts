import { usePaymentStore } from '@/entities/Payment';
import { useEffect, useMemo, useState } from 'react';

export function useCreatePaymentForm() {
  const { countries, addPayment, paymentMethods, isLoading, error, loadData } = usePaymentStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [currentCountry, setCurrentCountry] = useState<string>('');
  const [currentCurrency, setCurrentCurrency] = useState<string>('');
  const [currentPayment, setCurrentPayment] = useState<string>('');

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

  return {
    currentCountry,
    setCurrentCountry,
    currentCurrency,
    setCurrentCurrency,
    currentPayment,
    setCurrentPayment,
    changeCountry,
    changeCurrency,
    countryOptions,
    currencyOptions,
    paymentOptions,
    addPayment,
    isLoading,
    error,
  };
}
