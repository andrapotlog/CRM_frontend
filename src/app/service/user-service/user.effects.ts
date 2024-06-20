import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from './user.service';

import * as UserActions from './user.actions';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import { RegistrationData, UserModel } from './user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.loadAll().pipe(
          switchMap((result) => [
            UserActions.loadUsersSuccess({ payload: result }),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [
              UserActions.loadUsersFailure({
                error: error.error,
              }),
            ];
          }),
        ),
      ),
    ),
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      switchMap(({ payload }) =>
        this.createUser(payload).pipe(
          switchMap(() => [UserActions.createUserSuccess()]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [
              UserActions.createUserFailure({
                error: error.error,
              }),
            ];
          }),
        ),
      ),
    ),
  );

  createUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.createUserSuccess),
        tap(() => {
          this.router.navigateByUrl('/login');
        }),
      ),
    { dispatch: false },
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.loadUser().pipe(
          switchMap((result) => {
            return [UserActions.loadUserSuccess({ payload: result })];
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [
              UserActions.loadUsersFailure({
                error: error.error,
              }),
            ];
          }),
        ),
      ),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ payload }) =>
        this.modifyUser(payload).pipe(
          switchMap((updatedUser) => [
            UserActions.updateUserSuccess({ payload: updatedUser }),
            UserActions.loadUser(), // Dispatch loadUser to reload user data
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [
              UserActions.updateUserFailure({
                error: error.error,
              }),
            ];
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private userService: UserService,
    private router: Router,
  ) {}

  loadAll(): Observable<UserModel[]> {
    return this.userService.getUsers();
  }

  createUser(payload: RegistrationData) {
    return this.userService.registerUserData(payload);
  }

  loadUser(): Observable<UserModel> {
    return this.userService.getUser();
  }

  modifyUser(payload: UserModel) {
    return this.userService.modifyUserData(payload);
  }
}
