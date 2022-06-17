import { Injectable } from '@angular/core';
import {Catalog, GetFilteredProducts, ParamsProduct, Product, ProductService} from '../interfaces/products-interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService implements ProductService{

  private paramsProductForFiltered: ParamsProduct = {
    size: '',
    startPage: '1',
    perPage: '6',
    categories: '',
    color: '',
  };
  public productsState$: BehaviorSubject<ParamsProduct> = new BehaviorSubject<ParamsProduct>(this.paramsProductForFiltered);

  constructor(private http: HttpClient) { }

  addNewProduct(body: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.api}/products`, body);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.api}/products`);
  }

  getFilteredProducts(querystring: ParamsProduct): Observable<GetFilteredProducts> {
    let params = ''
    for(let elem in querystring){
      // @ts-ignore
      params += querystring[elem] ? `${elem}=${querystring[elem]}&` : ''
    }
    return this.http.get<GetFilteredProducts>(`${environment.api}/products/filter?${params}`);
  }

  getOneProduct(id: string): Observable<any> {
    return this.http.get(`${environment.api}/products/${id}`);
  }

  getCategories(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${environment.api}/catalog`);
  }
}
