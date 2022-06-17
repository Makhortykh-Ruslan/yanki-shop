import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationsService} from '../../../../services/notifications.service';
import {ProductsService} from '../../../../services/products.service';
import {GetFilteredProducts, ParamsProduct, Product} from '../../../../interfaces/products-interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  public dataProducts: GetFilteredProducts | undefined  = undefined;
  private subDataProducts$: Subscription | undefined;

  constructor(
      private notificationsService: NotificationsService,
      private productsService: ProductsService,
      private route: Router
  ) { }

  ngOnInit(): void {
   this.subDataProducts$ =  this.productsService.productsState$.subscribe(params => {
      this.onGetProducts(params);
    });
  }
  onGetProducts(params: ParamsProduct): void{
    this.productsService.getFilteredProducts(this.filteredParamsProducts(params)).subscribe(res => {
      this.dataProducts = res;
    }, error => {
    });
  }
  filteredParamsProducts(params: ParamsProduct): string{
    const {categories, perPage, startPage, size, color} = params;
    const paramCategories = categories ? `categories=${categories}` : '';
    const paramSize = size ? `size=${size}` : '';
    const paramColor = color ? `color=${color}` : '';
    return `${paramColor}&${paramSize}&${paramCategories}&startPage=${startPage}&perPage=${perPage}`;
  }

  onOpenProductPage(id: string): void {
    this.route.navigate(['/product', id]);
  }

  ngOnDestroy(): void {
    this.subDataProducts$?.unsubscribe();
  }
}
