interface IPaymentCardProps {
  country: string;
  currency: string;
  paymentMethod: string;
}

export const PaymentCard = ({ country, currency, paymentMethod }: IPaymentCardProps) => {
  return (
    <div>
      <p>Страна: {country}</p>
      <p>Валюта: {currency}</p>
      <p>Метод оплаты: {paymentMethod}</p>
      <hr />
    </div>
  );
};
