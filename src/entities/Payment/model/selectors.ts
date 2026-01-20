import { usePaymentStore } from './store';

export const usePaymentsValue = () => usePaymentStore((state) => state.payments);
export const useAddPayment = () => usePaymentStore((state) => state.addPayment);
