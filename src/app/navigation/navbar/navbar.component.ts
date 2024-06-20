import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromReducer from '../../app.reducer';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // @ts-ignore
  isAuth$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<fromReducer.State>,
    private auhService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromReducer.getIsAuth);
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  goToPayments() {
    this.router.navigateByUrl('/payment');
  }

  goToServiceRequest() {
    this.router.navigateByUrl('/track-request');
  }

  goToAnnouncements() {
    this.router.navigateByUrl('/announcements');
  }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  logOut() {
    this.auhService.logOut();
  }
}
