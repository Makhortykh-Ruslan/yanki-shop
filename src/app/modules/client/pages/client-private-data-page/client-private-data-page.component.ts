import { Component, OnInit } from '@angular/core';
import {SettingNavigationClientPage} from './settings';

@Component({
  selector: 'app-client-private-data-page',
  templateUrl: './client-private-data-page.component.html',
  styleUrls: ['./client-private-data-page.component.scss']
})
export class ClientPrivateDataPageComponent implements OnInit {
  settingNavigationClientPage = SettingNavigationClientPage;
  constructor() { }

  ngOnInit(): void {
  }

}
