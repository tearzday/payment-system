import { usePaymentsValue } from '../../model/selectors';
import { PaymentCard } from '../PaymentCard/PaymentCard';
import cls from './PaymentList.module.css';

export const PaymentList = () => {
  const payments = usePaymentsValue();

  if (payments.length === 0) {
    return <h2>Выплат еще не создано</h2>;
  }

  return (
    <div className={cls.list}>
      {payments.map((pay, index) => (
        <PaymentCard
          key={index}
          country={pay.country}
          currency={pay.currency}
          paymentMethod={pay.paymentMethod}
        />
      ))}
    </div>
  );
};
