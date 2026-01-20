export interface IPaymentMethod {
  currency: string;
  paymentMethods: string[];
}

export type PaymentMethods = IPaymentMethod[];

export type PaymentMethodsData = {
  payments: PaymentMethods;
};
