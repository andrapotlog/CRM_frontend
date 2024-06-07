import { createFeature, createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';
import { Payment } from '../payment.model';
import { Nullable } from '../../../../global.module';
import { ErrorModel } from '../../error.interface';

export interface PaymentState {
  payments: Payment[];
  payment: Nullable<Payment>;
  loading: boolean;
  error: Nullable<ErrorModel>;
}

export const initialState: PaymentState = {
  payments: [],
  payment: null,
  loading: false,
  error: null,
};

export const paymentReducer = createReducer(
  initialState,
  on(PaymentActions.loadPayments, (state) => ({ ...state, loading: true })),
  on(PaymentActions.loadPaymentsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payments: payload,
  })),
  on(PaymentActions.loadPaymentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(PaymentActions.loadPayment, (state) => ({ ...state, loading: true })),
  on(PaymentActions.loadPaymentSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payment: payload,
  })),
  on(PaymentActions.loadPaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(PaymentActions.savePayment, (state) => ({ ...state, loading: true })),
  on(PaymentActions.savePaymentSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(PaymentActions.savePaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const paymentFeature = createFeature({
  name: 'payment',
  reducer: paymentReducer,
});

export const {
  name,
  reducer,
  selectPayments,
  selectPayment,
  selectError,
  selectLoading,
} = paymentFeature;
