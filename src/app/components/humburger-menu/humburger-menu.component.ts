import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-humburger-menu',
  templateUrl: './humburger-menu.component.html',
  styleUrls: ['./humburger-menu.component.scss']
})
export class HumburgerMenuComponent implements OnInit {
  @Input() toggle = false;

  constructor() { }

  ngOnInit(): void {
  }

}
