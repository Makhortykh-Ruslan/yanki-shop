import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../interfaces/products-interface';
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

  addProduct(product: any): void{
    const copyCartStore = this.cartStore$.getValue();
    this.cartStore$.next([...copyCartStore, product])
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
    // @ts-ignore
    return this.http.put(`${environment.api}/cart/${id}`)

  }
  getCartDB(){
    return this.http.get(`${environment.api}/cart`).subscribe(res => {
      // @ts-ignore
      const result = res['products'];
      this.cartStore$.next(result)
    })
  }
}
