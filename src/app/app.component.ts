import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {NotificationsService} from './services/notifications.service';
import {MatDialog} from '@angular/material/dialog';
import {AlertComponent} from './components/alert/alert.component';
import {AuthService} from './services/auth.service';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {RenderService} from './services/render.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewChecked {
  public preloaderState: boolean | undefined;

  constructor(
      public notificationsService: NotificationsService,
      private dialog: MatDialog,
      private authService: AuthService,
      private cdr: ChangeDetectorRef,
      private renderService: RenderService,
  ) {
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
    }

  ngOnInit(): void {
    this.notificationsService.notificationSubject.subscribe(data => this.openNotificationDialog(data));
    this.onChangePreloader();
    this.renderService.render();
  }

  openNotificationDialog(data: any): void{
    if (data){
      const dialogRef = this.dialog.open(AlertComponent, {
        data,
        position: {top: '0'},
        // maxWidth: '500px',
        scrollStrategy: new NoopScrollStrategy(),
      });
      // const timer = setTimeout(() => {
      //   dialogRef.close(AlertComponent);
      //   clearTimeout(timer);
      // }, 2000);
    }
  }
  onChangePreloader(): void{
    this.notificationsService.preloader$.subscribe(state => this.preloaderState = state);
  }

}
