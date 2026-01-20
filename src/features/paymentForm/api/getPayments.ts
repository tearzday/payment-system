import type { PaymentMethods } from '../model/types';

export async function getPayments(): Promise<PaymentMethods> {
  try {
    const res = await fetch('/data/payments.json');
    const data = await res.json();
    return data.payments;
  } catch (error) {
    console.error('Что-то пошло не так', error);
    throw error;
  }
}
