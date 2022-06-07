import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  public productInsideCartArr: any;
  constructor(
      private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productInsideCartArr = this.cartService.cartStore$.getValue();
    console.log(this.productInsideCartArr)
  }
  generalSumCalculation(){
    const sum = this.productInsideCartArr.map((elem: any) => elem.cartQuantity * elem.product.currentPrice);
    return sum.reduce((acc: any, item: any) => acc + item, 0);
  }

}
