/*
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AuthService} from "./auth.service";

import * as AuthActions from './auth.actions'
import * as UserModel from "../userService/user.model";
import {switchMap} from "rxjs";
import {authenticate} from "./auth.actions";


@Injectable()
export class AuthEffects {
  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SET_AUTH),
      switchMap(({payload}) =>
        this.authenticate(payload).
      )
    )
  )

  constructor(
    private actions$: Actions,
    private store: Store,
    private authService: AuthService,
  ) {}

  authenticate(payload: UserModel.UserCredentials) {
    return this.authService.authenticateUser(payload);
  }
}
*/
