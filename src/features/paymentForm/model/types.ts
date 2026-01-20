export interface ICountry {
  code: string;
  name: string;
  currency: Array<string>;
}

export type Countries = ICountry[];

export interface IPaymentMethod {
  currency: string;
  paymentMethods: string[];
}

export type PaymentMethods = IPaymentMethod[];

export interface IPayment {
  country: string;
  currency: string;
  paymentMethod: string;
}

export type Payments = IPayment[];
