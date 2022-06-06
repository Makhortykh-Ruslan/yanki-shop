import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Alert, NotificationsService} from '../../services/notifications.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  public textAlert: any;

  constructor(private notificationsService: NotificationsService, @Inject(MAT_DIALOG_DATA) public data: Alert, private authService: AuthService) { }

  ngOnInit(): void {
    this.onGetMessage(this.data);
  }
  onGetMessage(dataAlert: any): void{
    const get = {
      registration: {title: 'Регистрация проша успешно!', text: 'Вы успешно зарегестрировались! Приятных покупок!'},
      auth: {title: 'Авторизация прошла успешно!', text: `Приятных покупок ${dataAlert.data?.firstName} ${dataAlert.data?.lastName} )))!`}
    };
    // @ts-ignore
    this.textAlert = dataAlert.text ? get[dataAlert.text] : dataAlert;
}


}
