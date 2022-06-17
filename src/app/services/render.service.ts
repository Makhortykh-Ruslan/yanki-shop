import { Injectable } from '@angular/core';
import {ProductsService} from './products.service';
import {AuthService} from './auth.service';
import {CartService} from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor(
      private productsService: ProductsService,
      private authService: AuthService,
      private cartService: CartService,
      ) { }

  render(){
    this.setAllProductsLocal();
    this.getCartDBCustomer();
  }

  setAllProductsLocal(){
    if(!sessionStorage.getItem('allProducts')){
      this.productsService.getAllProducts().subscribe(res => {
        sessionStorage.setItem('allProducts', JSON.stringify(res));
      })
    }
  }
  getCartDBCustomer(){
    if(this.authService.getToken){
      this.cartService.getCartDB();
    }
  }
}
