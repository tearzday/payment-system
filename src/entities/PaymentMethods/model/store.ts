import { create } from 'zustand';
import type { PaymentMethods } from './types';
import { getPaymentMethods } from '../api/getPaymentMethods';

interface IPaymentMethodsStore {
  paymentMethods: PaymentMethods;
  isLoading: boolean;
  error: string | null;
  loadPaymentMethods: () => Promise<void>;
}

export const usePaymentMethodsStore = create<IPaymentMethodsStore>((set, get) => ({
  paymentMethods: [],
  isLoading: false,
  error: null,
  loadPaymentMethods: async () => {
    if (get().paymentMethods.length > 0) {
      return;
    }
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const paymentMethods = await getPaymentMethods();
      set({ paymentMethods });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
