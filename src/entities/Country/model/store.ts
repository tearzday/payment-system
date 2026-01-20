import { create } from 'zustand';
import type { Countries } from './types';
import { getCountries } from '../api/getCountries';

interface ICountryStore {
  countries: Countries;
  isLoading: boolean;
  error: string | null;
  loadCountries: () => Promise<void>;
}

export const useCountryStore = create<ICountryStore>((set, get) => ({
  countries: [],
  isLoading: false,
  error: null,
  loadCountries: async () => {
    if (get().countries.length > 0) {
      return;
    }
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const countries = await getCountries();
      set({ countries });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
