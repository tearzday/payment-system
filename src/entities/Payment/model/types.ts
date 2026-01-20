export interface IPayment {
  country: string;
  currency: string;
  paymentMethod: string;
}

export type Payments = IPayment[];
