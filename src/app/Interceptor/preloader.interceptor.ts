import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {NotificationsService} from '../services/notifications.service';

@Injectable()
export class PreloaderInterceptor implements HttpInterceptor {

  constructor(private notificationsService: NotificationsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
        catchError((event: HttpEvent<any>) => {
          this.notificationsService.setErrorPreloader();
          return of(event);
        }),
        tap((event: HttpEvent<any>) => {
          this.notificationsService.setPreloaderState(event.type);
          return event;
        })
    );
  }
}
