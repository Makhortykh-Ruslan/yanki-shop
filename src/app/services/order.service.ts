import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {OrderInterface} from '../interfaces/order-interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderState: OrderInterface = {
    customerId: '',
    deliveryAddress: {
        country: '',
        city: '',
        address: '',
        postal: '',
      },
      shipping: 'shipping',
      paymentInfo: '',
      status: 'not shipped',
      email: '',
      mobile: '',
      letterSubject: 'Спасибо за заказ, правда это все тест...',
      letterHtml: ''
  }

  constructor(
      private http: HttpClient
  ) { }

  onCreateOrder(data: OrderInterface): Observable<any>{
    return this.http.post(`${environment.api}/orders`, data)
  }

  onChangeOrder(data: any): void{
    const customer = sessionStorage.getItem('customer');
    // @ts-ignore
    // this.orderState.customerId = JSON.parse(customer)._id;
    this.orderState.deliveryAddress.country = data.country;
    this.orderState.deliveryAddress.city = data.city;
    this.orderState.deliveryAddress.address = data.address;
    this.orderState.deliveryAddress.postal = data.postal;
    this.orderState.paymentInfo = data.paymentInfo;
    this.orderState.email = data.email;
    this.orderState.mobile = JSON.stringify(data.mobile);
    this.orderState.letterHtml =
        "<h1>Тест.</h1><p>{Other details about-page order in your HTML}</p>"
  }

  getOrderState(){
    return this.orderState;
  }
}
