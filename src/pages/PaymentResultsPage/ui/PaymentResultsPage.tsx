import { Button } from '@/shared/ui';
import { useNavigate } from 'react-router';
import cls from './PaymentResultsPage.module.css';
import { PaymentList } from '@/entities/Payment';

export const PaymentResultsPage = () => {
  const navigate = useNavigate();
  return (
    <main className={cls.container}>
      <h1 className={cls.title}>Результаты всех созданных выплат</h1>
      <PaymentList />
      <Button onClick={() => navigate('/')} theme="btn--accent">
        Создать новую выплату
      </Button>
    </main>
  );
};
