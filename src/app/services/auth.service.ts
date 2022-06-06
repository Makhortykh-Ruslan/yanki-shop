import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {User} from '../interfaces/auth-interface';
import {environment} from '../../environments/environment.prod';
import {catchError, tap} from 'rxjs/operators';
import {getToken} from 'codelyzer/angular/styles/cssLexer';
import {CustomerInterface} from '../interfaces/customer-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error$: Subject<string> = new Subject<string>();
  success$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

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
        .pipe(
            catchError(this.handleError.bind(this))
        );
  }

  login(user: User): Observable<any>{
    return this.http.post(`${environment.api}/customers/login`, user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
        );
  }

  getCustomer(): Observable<CustomerInterface>{
    return this.http.get<CustomerInterface>(`${environment.api}/customers/customer`);
  }

  private setToken(response: any | null): void {
    console.log('token', response)
    if (response){
      localStorage.setItem('idToken', response.token);
    }else {
      localStorage.clear();
    }
  }
  private handleError(error: HttpErrorResponse): Observable<string>{
    const {password, loginOrEmail, telephone, email, message, login} = error.error;
    switch (password || loginOrEmail || telephone || email || message || login){
      case 'INVALID_EMAIL':
        this.error$.next('Некорректный email');
        break;
      case 'Password incorrect':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Нет такого email');
        break;
      case 'Customer not found':
        this.error$.next('Нет такого пользователя');
        break;
      case 'That is not a valid phone number.':
        this.error$.next('Не правильный номер телефона, используйте формат +380999999999');
        break;
      case 'That is not a valid email':
        this.error$.next('Не валидный емайл');
        break;
      case 'Allowed characters for login is a-z, A-Z, 0-9.':
        this.error$.next('Для Логина допустимые символы для входа: a-z, A-Z, 0-9.');
        break;
      case message:
        const array = message.split(' ');
        const resultEmail = array.includes('Email') ? `Email ${array[1]} уже используется` : '';
        const resultLogin = array.includes('Login') ? `Логин ${array[1]} уже используется` : '';
        const result = resultEmail || resultLogin;
        this.error$.next(result);
        break;
        default : this.error$.next('Неизвестная ошибка спросите у Руслана что произошло makhortykh.ruslan@gmail.com');
    }
    return throwError(error);
  }
}
