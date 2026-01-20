import { usePaymentsValue } from '@/features/paymentForm';
import { PaymentCard } from '../PaymentCard/PaymentCard';

export const PaymentList = () => {
  const payments = usePaymentsValue();

  return (
    <div>
      {payments.length > 0 &&
        payments.map((pay, index) => (
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
