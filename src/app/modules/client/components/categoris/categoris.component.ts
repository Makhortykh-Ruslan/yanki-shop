import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NotificationsService} from '../../../../services/notifications.service';
import {ProductsService} from '../../../../services/products.service';
import {Catalog} from '../../../../interfaces/products-interface';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-categoris',
  templateUrl: './categoris.component.html',
  styleUrls: ['./categoris.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategorisComponent implements OnInit {
  nameChoose = 'Каталог';
  public categories: Catalog[] | undefined;
  panelState = false;

  constructor(
      private notificationsService: NotificationsService,
      private productsService: ProductsService
      ) { }

  ngOnInit(): void {
    console.log('hello categories')
    this.onGetCategories();
  }
  onGetCategories(): void{

    this.productsService.getCategories().subscribe(res => {
      this.categories = res;
      console.log('hello', res)

    }, error => {
      // this.notificationsService.notificationPreloader(false);
    }, () => {
      // this.notificationsService.notificationPreloader(false);
    });
  }


  onChangeCatalog(data: Catalog): void {
    this.panelState = !this.panelState;
    this.nameChoose = data.name;
    const copy = {...this.productsService.productsState$.getValue(), categories: data.id};
    this.productsService.productsState$.next(copy);
  }
}
