import { useEffect, useState } from 'react';
import { getCountries, getPayments } from '../api';
import type { Countries, PaymentMethods } from '../model/types';

export const PaymentForm = () => {
  const [countries, setCountries] = useState<Countries>([]);
  const [payments, setPayments] = useState<PaymentMethods>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    }

    loadData();
  }, []);

  console.log({ countries, payments });

  if(isLoading) {
    return <div>Загрузка...</div>;
  }
  
  if(error) {
    return <div>{error}</div>;
  }

  return (
    <form>
      <p>Countries: {countries.length}</p>
      <p>Payments: {payments.length}</p>
    </form>
  );
};
