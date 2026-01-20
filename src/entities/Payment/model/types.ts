interface IPaymentCountry {
  name: string;
  code: string;
}

export interface IPayment {
  country: IPaymentCountry;
  currency: string;
  paymentMethod: string;
}

export type Payments = IPayment[];
