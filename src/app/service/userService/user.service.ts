import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as fromModel from './user.model';
import { Router } from '@angular/router';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  test_url = 'http://localhost:8080/users/';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getUsers(): Observable<fromModel.UserModel[]> {
    return this.http.get<fromModel.UserModel[]>(this.test_url);
  }

  registerUserData(userData: fromModel.UserModel) {
    const request = this.http.post(this.test_url, userData);
    request.subscribe(
      (res) => {
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.log(error);
      },
    );

    return request;
  }

  getUser(): Observable<UserModel> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return this.http.get<fromModel.UserModel>(this.test_url + 'user', config);
  }
}
