import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NotificationsService} from '../../../../../services/notifications.service';
import {AuthService} from '../../../../../services/auth.service';
import {User} from '../../../../../interfaces/auth-interface';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CartService} from '../../../../../services/cart.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthorizationComponent implements OnInit {

  authForm: UntypedFormGroup = new UntypedFormGroup({
    loginOrEmail: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(30)])
  });
  submitted = false;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
      private notificationsService: NotificationsService,
      private authService: AuthService,
      private router: Router,
      public dialog: MatDialog,
      private cartService: CartService
  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.authForm.invalid) { return; }
    this.submitted = true;
    const user: User = {...this.authForm.value};
    this.authService.login(user).subscribe(res => {
      this.onGetCustomer();
      }, (error) => {
          this.submitted = false;
          }
      );
  }

  onShowRegistration(): void {
    this.toggle.emit(false);
  }
  onGetCustomer(): void{
    this.authService.getCustomer().subscribe(res => {
      this.submitted = false;
      this.authForm.reset();
      this.cartService.getCartDB();
      this.dialog.closeAll();
      sessionStorage.setItem('customer', JSON.stringify(res));
      this.notificationsService.notificationDialogSuccess('auth', res);
      this.router.navigate(['/clientAccount']);
    }, error => {
      this.submitted = false;
    });
  }
}
