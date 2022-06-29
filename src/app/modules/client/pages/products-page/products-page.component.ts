import {Component, OnInit} from '@angular/core';
import {NotificationsService} from '../../../../services/notifications.service';
import {ProductsService} from '../../../../services/products.service';
import {Product} from '../../../../interfaces/products-interface';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  public dataProducts$: BehaviorSubject<Product[]> | undefined;

  constructor(
      private notificationsService: NotificationsService,
      public productsService: ProductsService,
      private route: Router
  ) { }

  ngOnInit(): void {
    this.productsService.loadingProducts(this.productsService.productsState$.getValue());
    this.dataProducts$ = this.productsService.filteredProducts$;
  }

  onOpenProductPage(id: string): void {
    this.route.navigate(['/product', id]).then(r => r);
  };
}
