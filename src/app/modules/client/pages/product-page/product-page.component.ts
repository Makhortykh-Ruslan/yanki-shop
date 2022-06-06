import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../../../services/products.service';
import {NotificationsService} from '../../../../services/notifications.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Product} from '../../../../interfaces/products-interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  public panelOpenState = false;
  public imagesProduct: string[] | undefined;
  public imageTitle: string | undefined;
  public dataProduct: Product | undefined;
  public sizes = ['xs', 's', 'm', 'l', 'xl'];
  private $subParams: Subscription | undefined;

  constructor(
      private productsService: ProductsService,
      private notificationsService: NotificationsService,
      private router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    console.log('hello param', this.router.snapshot.params.id);
    this.getProduct(this.router.snapshot.params.id);
    // this.$subParams = this.router.params.subscribe(params => {
    //   this.getProduct(params['id']);
    // });
  }

  getProduct(id: string): void {
    // @ts-ignore
    const allProducts = JSON.parse(localStorage.getItem('allProducts'));
    const getProduct = allProducts.products.find((elem: Product) => elem.itemNo === id);
    this.imagesProduct = getProduct.imageUrls;
    this.dataProduct = getProduct;
    this.getTitleImg(this.imagesProduct)
    // this.productsService.getOneProduct(id).subscribe(res => {
    //   this.imagesProduct = res.imageUrls;
    //   this.dataProduct = res;
    //   console.log('hello onew product', res);
    //   this.getTitleImg(this.imagesProduct);
    // });
  }

  ngOnDestroy(): void {
    // this.$subParams?.unsubscribe();
  }

  getTitleImg(dataImages: any, idxImg = 0): void {
    this.imageTitle = dataImages[idxImg];
  }

  imagesChange(elem: string): void {
    const nextImageIdx = this.imagesProduct?.findIndex(item => item === elem);
    this.getTitleImg(this.imagesProduct, nextImageIdx);

  }


}
