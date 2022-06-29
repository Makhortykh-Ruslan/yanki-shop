import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {CustomerInterface} from '../../../../../interfaces/customer-interface';
import {AuthService} from '../../../../../services/auth.service';
import {NotificationsService} from '../../../../../services/notifications.service';
import {MatDialog} from '@angular/material/dialog';
import {CartService} from '../../../../../services/cart.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationComponent implements OnInit {

  public formRegistration: UntypedFormGroup = new UntypedFormGroup({
    firstName: new UntypedFormControl('', Validators.required),
    lastName:  new UntypedFormControl('', Validators.required),
    login: new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required,  Validators.minLength(7), Validators.maxLength(30)]),
    telephone: new UntypedFormControl('', [Validators.required]),
  });
  public submitted = false;

  constructor(
      private notificationsService: NotificationsService,
      public authService: AuthService,
      public dialog: MatDialog,
      private cartService: CartService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formRegistration.invalid) { return; }
    const customerDopParams = {
      gender: 'woman',
      isAdmin: false
    };
    const authAfterRegistrations = {
      loginOrEmail: this.formRegistration.value.email,
      password: this.formRegistration.value.password
    }
    const newCustomer: CustomerInterface = {...this.formRegistration.value, ...customerDopParams};
    this.authService.registration(newCustomer).subscribe(res => {
      this.authService.login(authAfterRegistrations).subscribe(res => {
        this.cartService.createCartDB();
        //If the client has previously added goods to the cart (locally), we transfer all previously added goods to the cart database
        if(this.cartService.cartStore$.getValue().length > 0){
          this.cartService.updateCartDB();
        }
        this.formRegistration.reset();
        this.dialog.closeAll();
        this.notificationsService.notificationDialogSuccess('registration');
      })
    });

  }
}
