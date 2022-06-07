import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../../../services/products.service';
import {NotificationsService} from '../../../../services/notifications.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {AddProduct, Product} from '../../../../interfaces/products-interface';
import {CartService} from '../../../../services/cart.service';
import {logger} from 'codelyzer/util/logger';
import {AuthService} from '../../../../services/auth.service';

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
  private allProducts: any;
  private getOneProduct: Product | undefined;

  constructor(
      private productsService: ProductsService,
      private notificationsService: NotificationsService,
      private router: ActivatedRoute,
      private cartService: CartService,
      private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getProduct(this.router.snapshot.params.id);
  }

  getProduct(id: string): void {
    this.allProducts = this.cartService.getAllProducts();
    this.getOneProduct = this.allProducts.find((elem: Product) => elem.itemNo === id);
    this.imagesProduct = this.getOneProduct?.imageUrls;
    this.dataProduct = this.getOneProduct;
    this.getTitleImg(this.imagesProduct)
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


  onAddToCartProduct() {
    if(!this.authService.getToken){
      const product: AddProduct = {
        cartQuantity: 1,
        product: this.getOneProduct
      }
      this.cartService.addProduct(product);
      this.notificationsService.notificationDialogSuccess(`${this.getOneProduct?.name}, добавлено в корзину!`)
    }else {
      this.cartService.addProductOnCartDB(this.getOneProduct?._id).subscribe(res => {
        // @ts-ignore
        this.cartService.cartStore$.next(res.products)
        this.notificationsService.notificationDialogSuccess(`${this.getOneProduct?.name}, добавлено в корзину!`)
      })
    }

  }
}
