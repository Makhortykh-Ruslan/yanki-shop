import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  constructor(
      private cartService: CartService
  ) { }

  ngOnInit(): void {
    console.log('hello', this.cartService.cartStore$.getValue())
  }

}
