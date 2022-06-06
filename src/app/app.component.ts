import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {NotificationsService} from './services/notifications.service';
import {MatDialog} from '@angular/material/dialog';
import {AlertComponent} from './components/alert/alert.component';
import {AuthService} from './services/auth.service';
import {CartService} from './services/cart.service';
import {ProductsService} from './services/products.service';
import {Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  public preloaderState: boolean | any;
  private subProducts$: Subscription | undefined;

  constructor(
      public notificationsService: NotificationsService,
      private dialog: MatDialog,
      private authService: AuthService,
      private cdr: ChangeDetectorRef,
      private productsService: ProductsService
  ) {
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
    }

  ngOnInit(): void {
    this.authService.error$.subscribe(error => this.openNotificationDialog(error));
    this.notificationsService.notificationSubject.subscribe(data => this.openNotificationDialog(data));
    this.onChangePreloader();
    this.setAllProductStore();
  }

  openNotificationDialog(data: any): void{
    if (data){
      const dialogRef = this.dialog.open(AlertComponent, {
        data,
        position: {top: '0'},
        maxWidth: '500px',
      });
      const timer = setTimeout(() => {
        dialogRef.close(AlertComponent);
        clearTimeout(timer);
      }, 2000);
    }
  }
  onChangePreloader(): void{
    this.notificationsService.preloader$.subscribe(state => this.preloaderState = state);
  }
  setAllProductStore(): void{
    if(!sessionStorage.getItem('allProducts')){
      this.subProducts$ = this.productsService.getAllProducts().subscribe(res => {
        sessionStorage.setItem('allProducts', JSON.stringify(res));
      })
    }
  }
  ngOnDestroy(): void {
    this.subProducts$?.unsubscribe();
  }

}
