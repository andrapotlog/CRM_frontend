import { createFeature, createReducer, on } from '@ngrx/store';
import * as ServiceRequestActions from './request.actions';
import { Nullable } from '../../../global.module';
import { ErrorModel } from '../error.interface';
import { ServiceRequestModel } from './request.model';

export interface State {
  serviceRequests: ServiceRequestModel[];
  selectedServiceRequest: Nullable<ServiceRequestModel>;
  loading: boolean;
  error: Nullable<ErrorModel>;
}

export const initialState: State = {
  serviceRequests: [],
  selectedServiceRequest: null,
  loading: false,
  error: null,
};

export const requestReducer = createReducer(
  initialState,

  on(ServiceRequestActions.loadServiceRequests, (state) => ({
    ...state,
    loading: true,
  })),

  on(
    ServiceRequestActions.loadServiceRequestsSuccess,
    (state, { payload }) => ({
      ...state,
      serviceRequests: payload,
      loading: false,
    }),
  ),

  on(ServiceRequestActions.loadServiceRequestsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ServiceRequestActions.filterServiceRequests, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ServiceRequestActions.createServiceRequest, (state) => ({
    ...state,
    loading: true,
  })),

  on(
    ServiceRequestActions.createServiceRequestSuccess,
    (state, { payload }) => ({
      ...state,
      serviceRequests: [...state.serviceRequests, payload],
      loading: false,
    }),
  ),

  on(ServiceRequestActions.createServiceRequestFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ServiceRequestActions.updateServiceRequest, (state) => ({
    ...state,
    loading: true,
  })),

  on(ServiceRequestActions.updateServiceRequestSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(ServiceRequestActions.updateServiceRequestFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ServiceRequestActions.deleteServiceRequest, (state) => ({
    ...state,
    loading: true,
  })),

  on(ServiceRequestActions.deleteServiceRequestSuccess, (state, { id }) => ({
    ...state,
    serviceRequests: state.serviceRequests.filter((sr) => sr.id !== id),
    loading: false,
  })),

  on(ServiceRequestActions.deleteServiceRequestFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const requestFeature = createFeature({
  name: 'request',
  reducer: requestReducer,
});

export const {
  name,
  reducer,
  selectServiceRequests,
  selectSelectedServiceRequest,
  selectError,
  selectLoading,
} = requestFeature;
