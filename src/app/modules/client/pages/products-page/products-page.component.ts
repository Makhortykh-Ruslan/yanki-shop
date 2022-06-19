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
   // this.subDataProducts$ =  this.productsService.productsState$.subscribe(params => {
   //   console.log('hello 1', params)
   //    this.onGetProducts(params);
   //  });
    this.onGetProducts(this.productsService.productsState$.getValue());
    this.subDataProducts$ = this.productsService.filteredProducts$.subscribe(products => {
      this.dataProducts = products;
    });
  }
  onGetProducts(params: ParamsProduct): void{
    this.productsService.loadingProducts(params);
    // this.productsService.getFilteredProducts(params).subscribe(res => {
    //   console.log('hello 2', params)
    //   this.dataProducts = res;
    // });
  };

  onOpenProductPage(id: string): void {
    this.route.navigate(['/product', id]);
  };

  ngOnDestroy(): void {
    this.subDataProducts$?.unsubscribe();
  };
}
