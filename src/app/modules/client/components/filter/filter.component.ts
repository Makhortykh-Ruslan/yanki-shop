import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Filter, settingFilter} from './settings';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {
  panelState = false;
  panelOpenState = false;
  nameChoose = 'Каталог';
  dataFilter = settingFilter;
  constructor() { }

  ngOnInit(): void {
  }
  // onChangeCatalog(data: Catalog) {
  //   this.panelState = !this.panelState;
  //   this.nameChoose = data.name;
  //
  // }

  onChangeFilter(filter: Filter): void {
    console.log('hello', filter)
  }
}
