import {Observable} from 'rxjs';

export interface Product {
  enabled?: boolean;
  imageUrls: string[];
  quantity: number;
  _id: string;
  name: string;
  currentPrice: number;
  previousPrice: number;
  categories: string;
  color: string;
  productUrl: string;
  brand: string;
  composition: string;
  size: string;
  itemNo: string;
  date?: string;
  __v?: string;
}
export interface AddProduct {
  cartQuantity: number;
  product: any;
}
export interface Catalog {
  _id: string;
  id: string;
  name: string;
  parentId: string;
  imgUrl: string;
  description: string;
  level: number;
  date: string;
  __v: number;
}
export interface ParamsProduct {
  [key: string]: string
}
export interface GetFilteredProducts {
  products: Product[];
  productsQuantity: number;
}

export interface ProductService {
  addNewProduct(product: Product): Observable<Product>;
  getAllProducts(): Observable<Product[]>;
  getOneProduct(id: string): Observable<Product>;
  getCategories(): Observable<Catalog[]>;
  getFilteredProducts(querystring: ParamsProduct): Observable<GetFilteredProducts>;
}
