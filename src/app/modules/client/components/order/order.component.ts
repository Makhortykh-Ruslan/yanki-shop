import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../../services/order.service';
import {NotificationsService} from '../../../../services/notifications.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orderForm = new UntypedFormGroup({
    country: new UntypedFormControl('', Validators.required),
    city: new UntypedFormControl('', Validators.required),
    address: new UntypedFormControl('', Validators.required),
    postal: new UntypedFormControl('', Validators.required),
    paymentInfo: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    mobile: new UntypedFormControl('', Validators.required)
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
