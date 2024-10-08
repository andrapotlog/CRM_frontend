import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromModel from '.././user-service/user.model';
import * as fromReducer from '../../app.reducer';
import * as Auth from '../auth/auth.actions';
import { AuthResponseModel } from './auth-response.model';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // test_url = 'http://localhost:9090/authentication/';
  // test_url = 'http://localhost/api/authentication/';
  apiUrl = environment.apiEndpoints.authenticationService;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromReducer.State>,
  ) {}

  initAuthListener() {
    if (JSON.parse(localStorage.getItem('isAuth')!) === 'yes') {
      this.store.dispatch(new Auth.SetAuth());
    } else {
      this.store.dispatch(new Auth.SetUnauth());
      this.router.navigateByUrl('/');
    }
  }

  registerUserCredentials(email: string) {
    return this.http.post(this.apiUrl + '/register', email);
  }

  authenticateUser(userCredentials: fromModel.UserCredentials) {
    const request = this.http.post(
      this.apiUrl + '/authenticate',
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
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/login');
  }
}
