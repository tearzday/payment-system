import { create } from 'zustand';
import type { IPayment, Payments } from '@/entities/Payment';

interface IPaymentStore {
  payments: Payments;
  addPayment: (payment: IPayment) => void;
}

export const usePaymentsStore = create<IPaymentStore>((set) => ({
  payments: [],
  addPayment: (payment: IPayment) => set((state) => ({ payments: [...state.payments, payment] })),
}));
