import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../../../services/cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
  public productInsideCartArr: any;
  private subCart$: Subscription | undefined;
  constructor(
      private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.subCart$ = this.cartService.cartStore$.subscribe(cart => {
      this.productInsideCartArr = cart;
    })
  }
  generalSumCalculation(){
    const sum = this.productInsideCartArr.map((elem: any) => elem.cartQuantity * elem.product.currentPrice);
    return sum.reduce((acc: any, item: any) => acc + item, 0);
  }

  ngOnDestroy(): void {
    this.subCart$?.unsubscribe();
  }

}
