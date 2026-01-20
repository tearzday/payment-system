import { PaymentForm } from '@/features/createPayment';
import cls from './PaymentPage.module.css';

export const PaymentPage = () => {
  return (
    <main className={cls.container}>
      <h1 className={cls.title}>Создание выплаты</h1>
      <PaymentForm />
    </main>
  );
};
