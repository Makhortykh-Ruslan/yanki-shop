import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AddProduct} from '../../../../interfaces/products-interface';

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
  constructor() { }

  ngOnInit(): void {
    console.log('hello product line', this.productData)
  }

}
