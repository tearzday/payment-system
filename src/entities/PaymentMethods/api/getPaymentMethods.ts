import { defaultFetch } from '@/shared/api';
import type { PaymentMethods, PaymentMethodsData } from '../model/types';

export async function getPaymentMethods(): Promise<PaymentMethods> {
  try {
    const data = await defaultFetch<PaymentMethodsData>({ url: '/data/payments.json' });
    return data.payments;
  } catch (error) {
    console.error(`Ошибка в getPaymentMethods: ${error}`);
    throw new Error('Ошибка при получении методов оплаты');
  }
}
