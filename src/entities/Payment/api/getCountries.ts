import { defaultFetch } from '@/shared/api/defaultFetch';
import type { Countries, CountriesData } from '../model/types';

export async function getCountries(): Promise<Countries> {
  try {
    const data = await defaultFetch<CountriesData>({ url: '/data/countries.json' });
    return data.countries;
  } catch (error) {
    console.error(`Ошибка в getCountries: ${error}`);
    throw new Error('Ошибка при получении стран');
  }
}
