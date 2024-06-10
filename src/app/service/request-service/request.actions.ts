import { createAction, props } from '@ngrx/store';
import { ErrorModel } from '../error.interface';
import { ServiceRequestModel } from './request.model';

export const loadServiceRequests = createAction(
  '[ServiceRequest] Load ServiceRequests',
);
export const loadServiceRequestsSuccess = createAction(
  '[ServiceRequest] Load ServiceRequests Success',
  props<{ payload: ServiceRequestModel[] }>(),
);
export const loadServiceRequestsFailure = createAction(
  '[ServiceRequest] Load ServiceRequests Failure',
  props<{ error: ErrorModel }>(),
);

export const filterServiceRequests = createAction(
  '[ServiceRequest] Filter ServiceRequests',
  props<{
    filters: { status?: string; priority?: string; location?: number };
  }>(),
);

export const createServiceRequest = createAction(
  '[ServiceRequest] Create ServiceRequest',
  props<{ payload: ServiceRequestModel }>(),
);
export const createServiceRequestSuccess = createAction(
  '[ServiceRequest] Create ServiceRequest Success',
  props<{ payload: ServiceRequestModel }>(),
);
export const createServiceRequestFailure = createAction(
  '[ServiceRequest] Create ServiceRequest Failure',
  props<{ error: ErrorModel }>(),
);

export const updateServiceRequest = createAction(
  '[ServiceRequest] Update ServiceRequest',
  props<{ payload: ServiceRequestModel }>(),
);
export const updateServiceRequestSuccess = createAction(
  '[ServiceRequest] Update ServiceRequest Success',
);
export const updateServiceRequestFailure = createAction(
  '[ServiceRequest] Update ServiceRequest Failure',
  props<{ error: ErrorModel }>(),
);

export const deleteServiceRequest = createAction(
  '[ServiceRequest] Delete ServiceRequest',
  props<{ id: number }>(),
);
export const deleteServiceRequestSuccess = createAction(
  '[ServiceRequest] Delete ServiceRequest Success',
  props<{ id: number }>(),
);
export const deleteServiceRequestFailure = createAction(
  '[ServiceRequest] Delete ServiceRequest Failure',
  props<{ error: ErrorModel }>(),
);
