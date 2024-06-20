import { createFeature, createReducer, on } from '@ngrx/store';
import { Nullable } from '../../../global.module';
import { UserModel } from './user.model';
import { ErrorModel } from '../error.interface';

import * as UserActions from './user.actions';

export interface State {
  users: UserModel[];
  currentUser: Nullable<UserModel>;
  currentUserLocation: Nullable<number>;
  currentUserRole: Nullable<string>;
  error: Nullable<ErrorModel>;
  loading: boolean;
}

export const initialState: State = {
  users: [],
  currentUser: null,
  currentUserLocation: null,
  currentUserRole: null,
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),

  on(UserActions.loadUsersSuccess, (state, { payload }) => ({
    ...state,
    users: payload,
    loading: false,
  })),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  on(UserActions.createUser, (state, { payload }) => ({
    ...state,
    loading: true,
  })),

  on(UserActions.createUserSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
  })),

  on(UserActions.loadUserSuccess, (state, { payload }) => ({
    ...state,
    currentUser: payload,
    currentUserLocation: payload.city,
    currentUserRole: payload.roles ? payload.roles[0].roleName : null,
    loading: false,
  })),

  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  on(UserActions.updateUser, (state, { payload }) => ({
    ...state,
    loading: true,
  })),

  on(UserActions.updateUserSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
);

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
});

export const {
  name,
  reducer,
  selectUserState,
  selectUsers,
  selectCurrentUser,
  selectCurrentUserLocation,
  selectCurrentUserRole,
  selectError,
  selectLoading,
} = userFeature;
