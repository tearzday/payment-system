export interface ICountry {
  code: string;
  name: string;
  currency: string;
}

export type Countries = ICountry[];

export interface IPaymentMethod {
  currency: string;
  paymentMethods: string[];
}

export type PaymentMethods = IPaymentMethod[];
