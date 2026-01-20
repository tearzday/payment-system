import { create } from 'zustand';
import type { Countries, IPayment, PaymentMethods, Payments } from './types';
import { getCountries, getPaymentMethods } from '../api';

interface IPaymentStore {
  payments: Payments;
  countries: Countries;
  paymentMethods: PaymentMethods;
  isLoading: boolean;
  error: string | null;
  addPayment: (payment: IPayment) => void;
  loadData: () => Promise<void>;
}

export const usePaymentStore = create<IPaymentStore>((set, get) => ({
  payments: [],
  countries: [],
  paymentMethods: [],
  isLoading: false,
  error: null,
  addPayment: (payment: IPayment) => set((state) => ({ payments: [...state.payments, payment] })),
  loadData: async () => {
    if (get().countries.length > 0 && get().paymentMethods.length > 0) {
      return;
    }
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const [countriesData, paymentsData] = await Promise.all([
        getCountries(),
        getPaymentMethods(),
      ]);
      set({ countries: countriesData, paymentMethods: paymentsData });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
