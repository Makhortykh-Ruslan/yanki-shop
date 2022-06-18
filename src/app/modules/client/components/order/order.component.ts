import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../../services/order.service';
import {NotificationsService} from '../../../../services/notifications.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orderForm = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    postal: new FormControl('', Validators.required),
    paymentInfo: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', Validators.required)
  })

  constructor(
      private orderService: OrderService,
      private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
  }

  onSubmitOrder() {
    if(localStorage.getItem('idToken')){
      this.notificationsService.notificationDialogSuccess('Спасибо за Ваш заказ!')
      // this.orderService.onChangeOrder(this.orderForm.value)
      // this.orderService.onCreateOrder(this.orderService.getOrderState()).subscribe(res => {
      //   console.log('hello xxx', res)
      // })
    }else {
      this.orderService.onChangeOrder(this.orderForm.value)
      this.notificationsService.notificationDialogSuccess('Спасибо за Ваш заказ!')
    }
  }
}
