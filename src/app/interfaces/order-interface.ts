export interface OrderInterface {
  customerId: string;
  deliveryAddress: {
    country: string;
    city: string;
    address: string;
    postal: string;
  },
  shipping: string;
  paymentInfo: string;
  status: string;
  email: string;
  mobile: string;
  letterSubject: string;
  letterHtml: string;
}
