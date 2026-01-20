import { PaymentList } from '@/entities/Payment';
import { Button } from '@/shared/ui';
import { useNavigate } from 'react-router';

export const PaymentResultsPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      PaymentResultsPage
      <PaymentList />
      <Button onClick={() => navigate('/')}>Создать новую выплату</Button>
    </div>
  );
};
