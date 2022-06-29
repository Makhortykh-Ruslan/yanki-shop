import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.dialog.open(PreloaderComponent);
  }

}
