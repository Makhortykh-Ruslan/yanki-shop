import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../../../../services/notifications.service';
import {ProductsService} from '../../../../services/products.service';
import {GetFilteredProducts, ParamsProduct, Product} from '../../../../interfaces/products-interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  public dataProducts: GetFilteredProducts | undefined  = undefined;

  constructor(
      private notificationsService: NotificationsService,
      private productsService: ProductsService,
      private route: Router
  ) { }

  ngOnInit(): void {
    this.productsService.productsState$.subscribe(params => {
      this.onGetProducts(params);
    });
  }
  onGetProducts(params: ParamsProduct): void{
    // this.notificationsService.notificationPreloader(true);
    this.productsService.getFilteredProducts(this.filteredParamsProducts(params)).subscribe(res => {
      this.dataProducts = res;
      localStorage.setItem('allProducts', JSON.stringify(res));
      // this.notificationsService.notificationPreloader(false);
    }, error => {
      // this.notificationsService.notificationPreloader(false);
    });
  }
  filteredParamsProducts(params: ParamsProduct): string{
    const {categories, perPage, startPage, size, color} = params;
    const paraCategories = categories ? `categories=${categories}` : '';
    const paramSize = size ? `size=${size}` : '';
    const paramColor = color ? `color=${color}` : '';
    return `${paramColor}&${paramSize}&${paraCategories}&startPage=${startPage}&perPage=${perPage}`;
  }

  onOpenProductPage(id: string): void {
    this.route.navigate(['/product', id]);
  }
}
