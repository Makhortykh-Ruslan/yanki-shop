import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AddProduct} from '../../../../interfaces/products-interface';
import {CartService} from '../../../../services/cart.service';

@Component({
  selector: 'app-product-line',
  templateUrl: './product-line.component.html',
  styleUrls: ['./product-line.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductLineComponent implements OnInit {
  sizes = ['s','m','l']
  sizeT = 's'
  @Input() productData: AddProduct | undefined;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  onDecreaseProductQuantity(_id: string) {
    this.cartService.localDecreaseProductQuantity(_id);
  }

  onDeletedProductFromCart(_id: string) {
    this.cartService.localDeletedProductFromCart(_id);
  }
  onAddProductQuantity(_id: string){
    this.cartService.addProductToCart(_id);
  }
}
