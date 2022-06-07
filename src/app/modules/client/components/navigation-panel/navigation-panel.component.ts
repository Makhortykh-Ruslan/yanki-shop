import {Component, Input, OnInit} from '@angular/core';
import {iconsArr, NavigateLink, routerNavigate} from './settings';
import {LogInComponent} from '../../_shara/log-in/log-in.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {NoopScrollStrategy} from '@angular/cdk/overlay';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnInit {
  public navigateIcons: NavigateLink[] = iconsArr;
  public navigateLinks: NavigateLink[] = routerNavigate;
  toggle = false;

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(window.innerWidth)
  }
  openDialog(value: any): void {
    const isToken = this.authService.getToken;
    if (isToken){
      if (value.mobile) { this.toggle = false; }
      this.router.navigate([value.link]);
    }else {
      if (value.logIn) { this.dialog.open(LogInComponent, {
        // height: window.innerWidth < 450 ? '100vh' : 'revert',
        maxWidth: window.innerWidth < 450 ? '90vw' : '80vw',
        scrollStrategy: new NoopScrollStrategy()
      }); }
      if (value.mobile) { this.toggle = false; }
    }

  }

  onNavigation(): void {
    this.toggle = false;
  }
}
