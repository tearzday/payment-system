import type { Countries } from '../model/types';

export async function getCountries(): Promise<Countries> {
  try {
    const res = await fetch('/data/countries.json');
    const data = await res.json();
    return data.countries;
  } catch (error) {
    console.error('Что-то пошло не так', error);
    throw error;
  }
}
