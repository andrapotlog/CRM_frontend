import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromModel from '../userService/user.model';
import * as fromReducer from '../../app.reducer';
import * as Auth from '../auth/auth.actions';
import { AuthResponseModel } from './auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  test_url = 'http://localhost:8080/authentication/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromReducer.State>,
  ) {}

  initAuthListener() {
    if (JSON.parse(localStorage.getItem('isAuth')!) === 'yes') {
      this.store.dispatch(new Auth.SetAuth());
      this.router.navigateByUrl('/profile');
    } else {
      this.store.dispatch(new Auth.SetUnauth());
      this.router.navigateByUrl('/');
    }
  }

  registerUserCredentials(userCredentials: fromModel.UserCredentials) {
    return this.http.post(this.test_url + 'register', userCredentials);
  }

  authenticateUser(userCredentials: fromModel.UserCredentials) {
    const request = this.http.post(
      this.test_url + 'authenticate',
      userCredentials,
    );
    request.subscribe((res) => {
      const { message, statusCode } = res as AuthResponseModel;

      this.store.dispatch(new Auth.SetAuth());

      localStorage.setItem('isAuth', JSON.stringify('yes'));
      localStorage.setItem('token', JSON.stringify(message));
      this.router.navigateByUrl('/profile');
    });
    return request;
  }

  logOut() {
    this.store.dispatch(new Auth.SetUnauth());
    localStorage.removeItem('isAuth');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
