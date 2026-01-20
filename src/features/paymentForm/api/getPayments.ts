import type { PaymentMethods } from '../model/types';

export async function getPayments(): Promise<PaymentMethods> {
  try {
    const res = await fetch('/data/payments.json');
    if (!res.ok) {
      throw new Error('Что-то пошло не так');
    }
    const data = await res.json();
    return data.payments;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
