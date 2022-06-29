import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {settingFilter} from './settings';
import {ProductsService} from '../../../../services/products.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit, OnDestroy {
  panelState = false;
  panelOpenState = false;
  nameChoose = 'Каталог';
  dataFilter = settingFilter;
  formFilter: any = new FormBuilder();
  constructor(private productsService: ProductsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formFilter = this.fb.group({
      size: '',
      color: '',
      price: ''
    })
  }

  onChangeFilter(event: any, paramsName: string): void {
    if(event.value){
      const copyParams = this.productsService.productsState$.getValue();
      copyParams[paramsName] = event.value;
      this.productsService.onChangeFilterParams(copyParams);
      this.productsService.productsState$.next(copyParams);
    }
  }

  onClearFilter() {
    this.formFilter.reset();
    this.formFilter = this.fb.group({
      // size: '',
      color: '',
      // price: ''
    });
    const formValue = this.formFilter.value;
    const copyParams = this.productsService.productsState$.getValue();
    this.productsService.onChangeFilterParams({...copyParams, ...formValue});
    this.productsService.productsState$.next({...copyParams, ...formValue});

  }

  ngOnDestroy(): void {
  }
}
