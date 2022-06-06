import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerInterface} from '../../../../../interfaces/customer-interface';
import {AuthService} from '../../../../../services/auth.service';
import {NotificationsService} from '../../../../../services/notifications.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationComponent implements OnInit {

  public formRegistration: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName:  new FormControl('', Validators.required),
    login: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,  Validators.minLength(7), Validators.maxLength(30)]),
    telephone: new FormControl('', [Validators.required]),
  });
  public submitted = false;

  constructor(
      private notificationsService: NotificationsService,
      public authService: AuthService,
      public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formRegistration.invalid) { return; }
    // this.notificationsService.preloader$.next(true);
    const customerDopParams = {
      gender: 'woman',
      isAdmin: false
    };
    const newCustomer: CustomerInterface = {...this.formRegistration.value, ...customerDopParams};
    this.authService.registration(newCustomer).subscribe(res => {
      console.log('hello new User', res)
      this.formRegistration.reset();
      this.dialog.closeAll();
      this.notificationsService.notificationDialogSuccess('registration');
      // this.notificationsService.preloader$.next(false);

    }, error => {
      // this.notificationsService.preloader$.next(false);
    }, () => {
      // this.notificationsService.preloader$.next(false);
    });

  }
}
