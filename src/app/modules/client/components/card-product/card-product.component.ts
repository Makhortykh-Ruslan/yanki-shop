import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../interfaces/products-interface';


@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent implements OnInit {
  @Input() data: Product | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log('hello product component')
  }

}
