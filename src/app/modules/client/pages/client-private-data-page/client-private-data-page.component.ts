import { Component, OnInit } from '@angular/core';
import {SettingNavigationClientPage} from './settings';
import {CartService} from '../../../../services/cart.service';

@Component({
  selector: 'app-client-private-data-page',
  templateUrl: './client-private-data-page.component.html',
  styleUrls: ['./client-private-data-page.component.scss']
})
export class ClientPrivateDataPageComponent implements OnInit {
  settingNavigationClientPage = SettingNavigationClientPage;
  constructor(
      private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  onChange(elem: any) {
    localStorage.setItem('idToken', '')
    this.cartService.cartStore$.next([]);

  }
}
