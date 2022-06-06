import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from '../../../../../services/notifications.service';
import {AuthService} from '../../../../../services/auth.service';
import {User} from '../../../../../interfaces/auth-interface';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthorizationComponent implements OnInit {

  authForm: FormGroup = new FormGroup({
    loginOrEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(30)])
  });
  submitted = false;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
      private notificationsService: NotificationsService,
      public authService: AuthService,
      private router: Router,
      public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // this.authService.error$.subscribe(error => {
    //   console.log('hello', error)
    // });
  }

  onSubmit(): void {
    if (this.authForm.invalid) { return; }
    this.submitted = true;
    // this.notificationsService.notificationPreloader(true);
    const user: User = {...this.authForm.value};
    this.authService.login(user).subscribe(res => {
      this.onGetCustomer();
      }, (error) => {
          this.submitted = false;
          // this.notificationsService.notificationPreloader(false);
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
      this.dialog.closeAll();
      sessionStorage.setItem('customer', JSON.stringify(res));
      this.notificationsService.notificationDialogSuccess('auth', res);
      this.router.navigate(['/clientAccount']);
    }, error => {
      this.submitted = false;
      // this.notificationsService.notificationPreloader(false);
    }, () => {
      // this.notificationsService.notificationPreloader(false);
    });
  }
}
