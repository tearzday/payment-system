import { useState, type FormEvent } from 'react';
import { Selector } from '@/shared/ui/Selector/Selector';
import { Button } from '@/shared/ui';
import { useNavigate } from 'react-router';
import { useCreatePaymentForm } from '../model/hooks/useCreatePaymentForm';
import cls from './PaymentForm.module.css';
import { Loader } from '@/shared/ui/Loader/Loader';

export const PaymentForm = () => {
  const {
    currentCountry,
    currentCurrency,
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
    errors,
  } = useCreatePaymentForm();

  const { errorCountry, errorPaymentMethods } = errors;

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    setTimeout(() => {
      addPayment({
        country: currentCountry,
        currency: currentCurrency,
        paymentMethod: currentPayment,
      });
      setIsSubmitLoading(false);
      navigate('/payment-results');
    }, 1000);
  };

  if (isLoadingCountries) {
    return <Loader size="md" />;
  }

  if (errorCountry || errorPaymentMethods) {
    const message = errors.errorCountry ?? errors.errorPaymentMethods;
    return <div>{message}</div>;
  }

  return (
    <form onSubmit={submitHandler} className={`${cls.form} ${isSubmitLoading ? cls.disabled : ''}`}>
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
        disabled={!currentCountry}
        isLoading={isLoadingPaymentMethods}
      />
      <Selector
        value={currentPayment}
        onChange={(e) => setCurrentPayment(e.target.value)}
        placeholder="Методы оплаты"
        id="payment-method"
        label="Выберите метод оплаты"
        options={paymentOptions}
        disabled={!currentCurrency}
      />

      <Button type="submit" disabled={!currentPayment}>
        {isSubmitLoading ? <Loader /> : 'Создать выплату'}
      </Button>
    </form>
  );
};
