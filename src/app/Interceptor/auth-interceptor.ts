import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const getToken =  this.authService.getToken ? this.authService.getToken : '';
    const cloneReq = req.clone({
      headers: req.headers.set('Authorization', getToken)
    });
    return next.handle(cloneReq);

  }

}
