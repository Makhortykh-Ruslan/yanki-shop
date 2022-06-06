import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LogInComponent implements OnInit {
  public stateTabs = true;
  constructor() { }

  ngOnInit(): void {
  }

  onChangeTabs(data: any): void {
    this.stateTabs = data;
  }
}
