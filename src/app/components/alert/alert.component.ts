import {Component, Inject, OnInit} from '@angular/core';
import {Alert} from '../../services/notifications.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  public textAlert: any;

  constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: Alert,
      ) { }

  ngOnInit(): void {
    this.onGetMessage(this.data);
  }
  onGetMessage(dataAlert: any): void{
    const get = {
      registration: {title: 'Регистрация проша успешно!', text: 'Вы успешно зарегестрировались! Приятных покупок!'},
      auth: {title: 'Авторизация прошла успешно!', text: `Приятных покупок ${dataAlert.data?.firstName} ${dataAlert.data?.lastName} )))!`}
    };
    // @ts-ignore
    this.textAlert = dataAlert.text && get[dataAlert.text] ? get[dataAlert.text] : dataAlert;
}


}
