import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from './user.service';

import * as UserActions from './user.actions';
import { catchError, Observable, switchMap } from 'rxjs';
import { UserModel } from './user.model';
import { HttpErrorResponse } from '@angular/common/http';

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
            return [UserActions.loadUsersFailure({ error: error.error })];
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
            return [UserActions.createUserFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.loadUser().pipe(
          switchMap((result) => [
            UserActions.loadUserSuccess({ payload: result }),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [UserActions.loadUsersFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private userService: UserService,
  ) {}

  loadAll(): Observable<UserModel[]> {
    return this.userService.getUsers();
  }

  createUser(payload: UserModel) {
    return this.userService.registerUserData(payload);
  }

  loadUser(): Observable<UserModel> {
    return this.userService.getUser();
  }
}
