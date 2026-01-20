export interface ICountry {
  code: string;
  name: string;
  currency: Array<string>;
}

export type Countries = ICountry[];

export type CountriesData = {
  countries: Countries;
};
