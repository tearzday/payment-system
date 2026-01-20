import { PaymentForm } from '@/features/paymentForm';
import { Button, Selector } from '@/shared/ui';

export const PaymentPage = () => {
  return (
    <div>
      <Selector
        onChange={(value) => console.log(value)}
        placeholder="test"
        id="test"
        label="Choose a pet:"
        options={[
          {
            value: 'dog',
            text: 'Dog',
          },
          {
            value: 'cat',
            text: 'Cat',
          },
          {
            value: 'hamster',
            text: 'Hamster',
          },
          {
            value: 'parrot',
            text: 'Parrot',
          },
          {
            value: 'spider',
            text: 'Spider',
          },
          {
            value: 'goldfish',
            text: 'Goldfish',
          },
        ]}
      />
      <Button onClick={() => console.log('btn')}>btn</Button>
      <PaymentForm />
    </div>
  );
};
