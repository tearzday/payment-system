import { usePaymentsStore } from './store';

export const usePaymentsValue = () => usePaymentsStore((state) => state.payments);
export const useAddPayment = () => usePaymentsStore((state) => state.addPayment);
