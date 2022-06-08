import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {User} from '../interfaces/auth-interface';
import {environment} from '../../environments/environment.prod';
import {tap} from 'rxjs/operators';
import {CustomerInterface} from '../interfaces/customer-interface';
import {NotificationsService} from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // error$: Subject<string> = new Subject<string>();
  // success$: Subject<string> = new Subject<string>();

  constructor(
      private http: HttpClient,
      private notificationsService: NotificationsService,
      ) { }

  get getToken(): string | null{
    return  localStorage.getItem('idToken');
  }
  logOut(): void{
    this.setToken(null);
  }
  isAuth(): string{
    return <string>this.getToken;
  }
  registration(newCustomer: CustomerInterface): Observable<any>{
    return this.http.post<CustomerInterface>(`${environment.api}/customers`, newCustomer)
  }

  login(user: User): Observable<any>{
    return this.http.post(`${environment.api}/customers/login`, user)
        .pipe(
            tap(this.setToken),
        );
  }

  getCustomer(): Observable<CustomerInterface>{
    return this.http.get<CustomerInterface>(`${environment.api}/customers/customer`);
  }

  private setToken(response: any | null): void {
    if (response){
      localStorage.setItem('idToken', response.token);
    }else {
      localStorage.clear();
    }
  }
  public handleError(error: any): Observable<string>{
    const {password, loginOrEmail, telephone, email, message, login} = error.error;
    switch (password || loginOrEmail || telephone || email || message || login){
      case 'INVALID_EMAIL':
        this.notificationsService.notificationDialogError('Некорректный email')
        break;
      case 'Password incorrect':
        this.notificationsService.notificationDialogError('Неверный пароль')
        break;
      case 'EMAIL_NOT_FOUND':
        this.notificationsService.notificationDialogError('Нет такого email')
        break;
      case 'Customer not found':
        this.notificationsService.notificationDialogError('Нет такого пользователя')
        break;
      case 'That is not a valid phone number.':
        this.notificationsService.notificationDialogError('Не правильный номер телефона, используйте формат +380999999999')
        break;
      case 'That is not a valid email':
        this.notificationsService.notificationDialogError('Не валидный email')
        break;
      case 'Allowed characters for login is a-z, A-Z, 0-9.':
        this.notificationsService.notificationDialogError('Для Логина допустимые символы для входа: a-z, A-Z, 0-9.')
        break;
      case message:
        const array = message.split(' ') ? message.split(' ') :
            this.notificationsService.notificationDialogError(`${message}`)
        ;
        const resultEmail = array.includes('Email') ? `Email ${array[1]} уже используется` : '';
        const resultLogin = array.includes('Login') ? `Логин ${array[1]} уже используется` : '';
        const result = resultEmail || resultLogin;
        this.notificationsService.notificationDialogError(`${result}`)
        break;
        default : this.notificationsService.notificationDialogError('Неизвестная ошибка, узнайте у разработчика что пошло не так makhortykh.ruslan@gmail.com')
    }
    return throwError(error);
  }
}
