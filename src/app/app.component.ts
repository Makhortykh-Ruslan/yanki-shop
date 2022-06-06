import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NotificationsService} from './services/notifications.service';
import {MatDialog} from '@angular/material/dialog';
import {AlertComponent} from './components/alert/alert.component';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewChecked {
  public preloaderState: boolean | any;

  constructor(
      public notificationsService: NotificationsService,
      private dialog: MatDialog,
      private authService: AuthService,
      private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
    }

  ngOnInit(): void {
    this.authService.error$.subscribe(error => this.openNotificationDialog(error));
    this.notificationsService.notificationSubject.subscribe(data => this.openNotificationDialog(data));
    this.onChangePreloader();
  }

  openNotificationDialog(data: any): void{
    if (data){
      const dialogRef = this.dialog.open(AlertComponent, {
        data,
        position: {top: '0'},
        maxWidth: '500px',
      });
      // const timer = setTimeout(() => {
      //   dialogRef.close(AlertComponent);
      //   clearTimeout(timer);
      // }, 2500);
    }
  }
  onChangePreloader(): void{
    this.notificationsService.preloader$.subscribe(state => this.preloaderState = state);
  }

}
