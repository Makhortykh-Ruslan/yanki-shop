import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

export type AlertType = 'success' | 'error' | 'warning';
type AlertTypeObject = {
  success: string;
  token: string;
};
export interface Alert {
  type: AlertType | AlertTypeObject;
  text: string;
  data?: {};
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  preloader$: BehaviorSubject<any>  = new BehaviorSubject(false);
  public notificationSubject: Subject<Alert> = new Subject<Alert>();
  private counter = 0;
  constructor() { }

  notificationPreloader(value: boolean): void{
    // this.preloader$.next(value);
  }
  public notificationDialogSuccess(text: string, data?: {}): void{
    this.notificationSubject.next({type: 'success', text, data});
  }
  public notificationDialogError(text: string): void{
    this.notificationSubject.next({type: 'error', text});
  }
  setErrorPreloader(): void{
    this.preloader$.next(false);
  }
  setPreloaderState(type: number): void{
    if (type === 0){
      this.counter++;
    }else {
      this.counter--;
    }
    if (this.counter === 0){
      this.preloader$.next(false);
    }else {
      this.preloader$.next(true);
    }
  }

}
