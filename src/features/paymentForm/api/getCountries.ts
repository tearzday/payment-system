import type { Countries } from '../model/types';

export async function getCountries(): Promise<Countries> {
  try {
    const res = await fetch('/data/countries.json');
    if (!res.ok) {
      throw new Error('Что-то пошло не так');
    }
    const data = await res.json();
    return data.countries;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
