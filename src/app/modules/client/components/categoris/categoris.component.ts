import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NotificationsService} from '../../../../services/notifications.service';
import {ProductsService} from '../../../../services/products.service';
import {Catalog} from '../../../../interfaces/products-interface';

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
    this.onGetCategories();
  }
  onGetCategories(): void{
    this.productsService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }


  onChangeCatalog(data: Catalog): void {
    this.panelState = !this.panelState;
    this.nameChoose = data.name;
    const copy = {...this.productsService.productsState$.getValue(), categories: data.id};
    this.productsService.productsState$.next(copy);
  }
}
