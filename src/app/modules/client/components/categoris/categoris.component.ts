import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NotificationsService} from '../../../../services/notifications.service';
import {ProductsService} from '../../../../services/products.service';
import {Catalog} from '../../../../interfaces/products-interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-categoris',
  templateUrl: './categoris.component.html',
  styleUrls: ['./categoris.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategorisComponent implements OnInit, OnDestroy {
  nameChoose = 'Каталог';
  public categories: Catalog[] | undefined;
  panelState = false;
  subCategories$: Subscription | undefined;


  constructor(
      private notificationsService: NotificationsService,
      private productsService: ProductsService
      ) { }

  ngOnInit(): void {
    this.onGetCategories();
  }
  onGetCategories(): void{
    // @ts-ignore
    this.categories = JSON.parse(sessionStorage.getItem('categories'));
    // this.subCategories$ = this.productsService.getCategories().subscribe(res => {
    //   this.categories = res;
    // });
  };


  onChangeCatalog(data: Catalog): void {
    this.panelState = !this.panelState;
    this.nameChoose = data.name;
    const params = {...this.productsService.productsState$.getValue(), categories: data.id};
    this.productsService.onChangeFilterParams(params);
    this.productsService.productsState$.next(params);
  }

  ngOnDestroy(): void {
    // this.subCategories$?.unsubscribe();
  };
}
