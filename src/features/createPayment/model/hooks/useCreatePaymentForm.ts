import { useCountryStore } from '@/entities/Country';
import { usePaymentMethodsStore } from '@/entities/PaymentMethods';
import { useEffect, useMemo, useState } from 'react';
import { useAddPayment } from '@/entities/Payment';

export function useCreatePaymentForm() {
  const addPayment = useAddPayment();

  const {
    countries,
    loadCountries,
    isLoading: isLoadingCountries,
    error: errorCountry,
  } = useCountryStore();

  const {
    paymentMethods,
    loadPaymentMethods,
    isLoading: isLoadingPaymentMethods,
    error: errorPaymentMethods,
  } = usePaymentMethodsStore();

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const [currentCountry, setCurrentCountry] = useState<string>('');
  const [currentCurrency, setCurrentCurrency] = useState<string>('');
  const [currentPayment, setCurrentPayment] = useState<string>('');

  const changeCountry = (countryCode: string) => {
    if (paymentMethods.length === 0) {
      loadPaymentMethods();
    }
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
    isLoadingCountries,
    isLoadingPaymentMethods,
    errors: { errorCountry, errorPaymentMethods },
  };
}
