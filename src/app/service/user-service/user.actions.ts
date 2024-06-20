import { createAction, props } from '@ngrx/store';
import { RegistrationData, UserModel } from './user.model';
import { ErrorModel } from '../error.interface';

export const loadUsers = createAction('[USER] Load Users');

export const loadUsersSuccess = createAction(
  '[USER] Load Users Success',
  props<{ payload: UserModel[] }>(),
);

export const loadUsersFailure = createAction(
  '[USER] Load Users Failure',
  props<{ error: ErrorModel }>(),
);

export const createUser = createAction(
  '[USER] Create User',
  props<{ payload: RegistrationData }>(),
);

export const createUserSuccess = createAction('[USER] Create User Success');

export const createUserFailure = createAction(
  '[USER] Create User Failure',
  props<{ error: ErrorModel }>(),
);

export const loadUser = createAction('[USER] Load User');

export const loadUserSuccess = createAction(
  '[USER] Load User Success',
  props<{ payload: UserModel }>(),
);

export const loadUserFailure = createAction(
  '[USER] Load User Failure',
  props<{ error: ErrorModel }>(),
);

export const updateUser = createAction(
  '[USER] Update User',
  props<{ payload: UserModel }>(),
);
export const updateUserSuccess = createAction(
  '[USER] Update User Success',
  props<{ payload: UserModel }>(),
);
export const updateUserFailure = createAction(
  '[USER] Update User Failure',
  props<{ error: ErrorModel }>(),
);
