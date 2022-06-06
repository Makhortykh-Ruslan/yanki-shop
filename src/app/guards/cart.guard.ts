import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {CartService} from '../services/cart.service';
import {NotificationsService} from '../services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {
  constructor(
      private cartService: CartService,
      private notificationsService: NotificationsService,
      ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.cartService.cartStore$.getValue().length <= 0){
      this.notificationsService.notificationDialogError('В корзине пока ничего нет!')
      return false;
    } else {
      return true;
    }
  }
  
}
