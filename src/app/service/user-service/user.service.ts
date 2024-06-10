import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as fromModel from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  test_url = 'http://localhost:9090/users';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
  ) {}

  getUsers(): Observable<fromModel.UserModel[]> {
    return this.http.get<fromModel.UserModel[]>(this.test_url);
  }

  registerUserData(userData: fromModel.RegistrationData) {
    console.log(userData);
    return this.http.post(this.test_url, userData);
  }

  getUser(): Observable<fromModel.UserModel> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return this.http.get<fromModel.UserModel>(this.test_url + '/user', config);
  }

  modifyUserData(user: fromModel.UserModel) {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return this.http.put<fromModel.UserModel>(this.test_url, user, config);
  }
}
