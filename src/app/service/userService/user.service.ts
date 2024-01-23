import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as fromModel from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  test_url = 'http://localhost:8080/';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getUsers(): Observable<fromModel.UserModel> {
    return this.http.get<fromModel.UserModel>(this.test_url + 'users');
  }

  registerUserData(userData: fromModel.UserModel) {
    const request = this.http.post(this.test_url + 'users', userData);
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
}
