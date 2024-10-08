import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as fromModel from './user.model';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // test_url = 'http://localhost/api/users';
  private apiUrl = environment.apiEndpoints.userService;

  // test_url = 'http://localhost:9090/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<fromModel.UserModel[]> {
    return this.http.get<fromModel.UserModel[]>(this.apiUrl);
  }

  registerUserData(userData: fromModel.RegistrationData) {
    console.log(userData);
    return this.http.post(this.apiUrl, userData);
  }

  getUser(): Observable<fromModel.UserModel> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return this.http.get<fromModel.UserModel>(this.apiUrl + '/user', config);
  }

  modifyUserData(user: fromModel.UserModel) {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return this.http.put<fromModel.UserModel>(this.apiUrl, user, config);
  }
}
