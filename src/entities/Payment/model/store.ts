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

export const usePaymentStore = create<IPaymentStore>((set) => ({
  payments: [],
  countries: [],
  paymentMethods: [],
  isLoading: false,
  error: null,
  addPayment: (payment: IPayment) => set((state) => ({ payments: [...state.payments, payment] })),
  loadData: async () => {
    set({ isLoading: true });
    try {
      const [countriesData, paymentsData] = await Promise.all([
        getCountries(),
        getPaymentMethods(),
      ]);
      set({ countries: countriesData, paymentMethods: paymentsData });
    } catch (err) {
      set({ error: `Ошибка загрузки данных, ${err}` });
    } finally {
      set({ isLoading: false });
    }
  },
}));
