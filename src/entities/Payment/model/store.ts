import { create } from 'zustand';
import type { IPayment, Payments } from './types';

interface IPaymentStore {
  payments: Payments;
  isLoading: boolean;
  addPayment: (payment: IPayment) => void;
}

export const usePaymentStore = create<IPaymentStore>((set) => ({
  payments: [],
  isLoading: false,
  addPayment: (payment: IPayment) => set((state) => ({ payments: [...state.payments, payment] })),
}));
