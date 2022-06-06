import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FooterSettings, footerSettings} from './settings';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  footerSettings: FooterSettings[] = footerSettings;
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
