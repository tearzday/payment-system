import type { FormEvent } from 'react';
import { Selector } from '@/shared/ui/Selector/Selector';
import { Button } from '@/shared/ui';
import { useNavigate } from 'react-router';
import { useCreatePaymentForm } from '../model/hooks/useCreatePaymentForm';

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
    isLoading,
    error,
  } = useCreatePaymentForm();

  const navigate = useNavigate();

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
