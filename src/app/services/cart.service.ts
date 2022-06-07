import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AddProduct, Product} from '../interfaces/products-interface';
import {ProductsService} from './products.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private allProducts: Product[] | undefined | null;
  public cartStore$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
      private productsService: ProductsService,
      private http: HttpClient
  ) { }

  getAllProducts(): string | null{
    return JSON.parse(sessionStorage.getItem('allProducts') || '{}');
  }

  addProduct(product: AddProduct): void{
    const copyCartStore = this.cartStore$.getValue();
    const result  = copyCartStore.find(elem => elem.product.itemNo === product.product.itemNo);
    if(result){
      const idx = copyCartStore.findIndex(elem => elem.product.itemNo === product.product.itemNo);
      copyCartStore[idx].cartQuantity++
      this.cartStore$.next(copyCartStore);
    }else {
      this.cartStore$.next([...copyCartStore, product])
    }
  }
  deletedProduct(id: string | number): void{

  }

  createCartDB(){
    const newCart = {
      product: '',
      cartQuantity: 1
    }
    return this.http.post(`${environment.api}/cart`, newCart)
  }
  addProductOnCartDB(id: string| undefined){
    return this.http.put(`${environment.api}/cart/${id}`, null)

  }
  getCartDB(){
    return this.http.get(`${environment.api}/cart`).subscribe(res => {
      // @ts-ignore
      const result = res['products'];
      this.cartStore$.next(result)
    })
  }
}
