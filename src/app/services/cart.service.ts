import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {AddProduct, Product} from '../interfaces/products-interface';
import {ProductsService} from './products.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private allProducts: Product[] | undefined | null;
  public cartStore$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
      private productsService: ProductsService,
      private http: HttpClient,
      private authService: AuthService
  ) { }

  getAllProducts(): string | null{
    return JSON.parse(sessionStorage.getItem('allProducts') || '{}');
  }

  addProduct(product: AddProduct): void{
    const copyCartStore = this.cartStore$.getValue();
    const hasProduct  = copyCartStore.find(elem => elem.product.itemNo === product.product.itemNo);
    if(hasProduct){
      const idx = copyCartStore.findIndex(elem => elem.product.itemNo === product.product.itemNo);
      copyCartStore[idx].cartQuantity++
      this.updateLocalCartStore(copyCartStore);
    }else {
      this.updateLocalCartStore([...copyCartStore, product]);
    }
  }

  updateLocalCartStore(data: AddProduct[] | Product[]){
    this.cartStore$.next(data);
  }

  createCartDB(){
    const newCart = {
      product: '',
      cartQuantity: 1
    }
    return this.http.post(`${environment.api}/cart`, newCart)
  }

  updateCartDB(): Subscription{
    const copyCartStore = this.cartStore$.getValue();
    const updateCart: AddProduct[] = [];
    copyCartStore.map(elem => {
      updateCart.push({product: elem.product._id, cartQuantity: elem.cartQuantity});
    });
    return this.http.put<{id: string, products: Product[]}>(`${environment.api}/cart`, {products: updateCart}).subscribe(res => {
      const result = res.products;
      this.updateLocalCartStore(result);
    });
  }

  addProductOnCartDB(id: string| undefined){
    return this.http.put(`${environment.api}/cart/${id}`, null)
  }

  getCartDB(): Subscription{
    const getToken = this.authService.getToken;
    const headerDict: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': getToken
    }

    const requestOptions: any = {
      headers: new Headers(headerDict),
    };
    return this.http.get(`${environment.api}/cart`, requestOptions).subscribe(res => {
      // @ts-ignore
      if(res?.products){
        // @ts-ignore
        const result = res?.products;
        this.updateLocalCartStore(result);
      }
    })
  }
  decreaseProductQuantity(id: string){
    return this.http.delete(`${environment.api}/cart/product/${id}`)
  }

  deletedProduct(id: string | number){
    return this.http.delete(`${environment.api}/cart/${id}`)
  }

  addProductToCart(id: string){
    if(this.authService.getToken){
      this.addProductOnCartDB(id).subscribe(res => {
        // @ts-ignore
        this.updateLocalCartStore(res?.products)
      })
    }else {
      this.incrementOrDecrement('increment', id);
    }

  }
  localDecreaseProductQuantity(_id: string){

    if(this.authService.getToken){
      this.decreaseProductQuantity(_id).subscribe(res => {
        // @ts-ignore
        this.updateLocalCartStore(res['products'])
      })
    }else {
      this.incrementOrDecrement('decrement', _id)
    }
  }
  localDeletedProductFromCart(_id: string){
    if (this.authService.getToken){
      this.deletedProduct(_id).subscribe(res => {
        // @ts-ignore
        this.updateLocalCartStore(res['products'])
      })
    }else {
      this.localDeletedProduct(_id);
    }
  }

  incrementOrDecrement(type: string, _id: string){
    const copyCartStore = this.cartStore$.getValue();
    const hasProduct  = copyCartStore.find(elem => elem.product._id === _id);
    if(hasProduct){
      const idx = copyCartStore.findIndex(elem => elem.product._id === _id);

      if(copyCartStore[idx].cartQuantity === 1 && type === 'decrement'){
        copyCartStore.splice(idx, 1);
        this.updateLocalCartStore(copyCartStore);
        return
      }

      if(type === 'increment'){
        copyCartStore[idx].cartQuantity++
      }
      if(type === 'decrement'){
        copyCartStore[idx].cartQuantity--
      }
      this.updateLocalCartStore(copyCartStore);
    }
  }

  localDeletedProduct(_id: string){
    const copyCartStore = this.cartStore$.getValue();
    const hasProduct  = copyCartStore.find(elem => elem.product._id === _id);
    if(hasProduct){
      const idx = copyCartStore.findIndex(elem => elem.product._id === _id);
      copyCartStore.splice(idx, 1);
      this.updateLocalCartStore(copyCartStore);
    }
  }
}
