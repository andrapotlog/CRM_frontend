import { createAction, props } from '@ngrx/store';
import { Payment } from '../payment.model';
import { ErrorModel } from '../../error.interface';

export const loadPayments = createAction('[Payment] Load Payments');
export const loadPaymentsSuccess = createAction(
  '[Payment] Load Payments Success',
  props<{ payload: Payment[] }>(),
);
export const loadPaymentsFailure = createAction(
  '[Payment] Load Payments Failure',
  props<{ error: ErrorModel }>(),
);

export const loadPayment = createAction(
  '[Payment] Load Payment',
  props<{ payload: number }>(),
);
export const loadPaymentSuccess = createAction(
  '[Payment] Load Payments Success',
  props<{ payload: Payment }>(),
);
export const loadPaymentFailure = createAction(
  '[Payment] Load Payments Failure',
  props<{ error: ErrorModel }>(),
);

export const savePayment = createAction(
  '[Payment] Save Payment',
  props<{ payload: Payment }>(),
);
export const savePaymentSuccess = createAction(
  '[Payment] Save Payment Success',
);
export const savePaymentFailure = createAction(
  '[Payment] Save Payment Failure',
  props<{ error: ErrorModel }>(),
);
