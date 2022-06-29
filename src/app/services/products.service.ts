import {Injectable, OnDestroy} from '@angular/core';
import {
  Catalog,
  GetFilteredProducts,
  ParamsProduct,
  Product,
  ProductService
} from '../interfaces/products-interface';
import {BehaviorSubject, map, Observable, Subject, Subscription, takeUntil} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService implements ProductService, OnDestroy{

  public paramsProductForFiltered: ParamsProduct = {
    size: '',
    startPage: '1',
    perPage: '6',
    categories: '',
    color: '',
  };
  private subDestroy$: Subscription | undefined;
  public productsState$: BehaviorSubject<ParamsProduct> = new BehaviorSubject<ParamsProduct>(this.paramsProductForFiltered);
  public filteredProducts$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  addNewProduct(body: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.api}/products`, body);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.api}/products`);
  }

  getFilteredProducts(querystring: ParamsProduct): Observable<GetFilteredProducts> {
    const params = Object.entries(querystring).map((elem) => elem[1] ? `${elem[0]}=${elem[1]}&` : '').filter(elem => elem !== '').join('')
    return this.http.get<any>(`${environment.api}/products/filter?${params}`).pipe(
        map(elem => elem.products),
    )
  }

  getOneProduct(id: string): Observable<any> {
    return this.http.get(`${environment.api}/products/${id}`);
  }

  getCategories(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${environment.api}/catalog`);
  }

  onChangeFilterParams(params: ParamsProduct): void{
    this.loadingProducts(params);
  }
  loadingProducts(params: ParamsProduct): void{
    this.subDestroy$ = this.getFilteredProducts(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe(products => {
      this.filteredProducts$.next(products);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
