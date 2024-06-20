import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PaymentService } from './payment.service';
import * as PaymentActions from './payment.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Payment } from '../payment.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PaymentEffects {
  loadPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.loadPayments),
      switchMap(() =>
        this.loadAll().pipe(
          switchMap((result) => [
            PaymentActions.loadPaymentsSuccess({ payload: result }),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [PaymentActions.loadPaymentsFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );

  loadPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.loadPayment),
      switchMap(({ payload }) =>
        this.loadPayment(payload).pipe(
          switchMap((result) => [
            PaymentActions.loadPaymentSuccess({ payload: result }),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [PaymentActions.loadPaymentFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );

  savePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.savePayment),
      switchMap(({ payload }) =>
        this.savePayment(payload).pipe(
          switchMap(() => [
            PaymentActions.savePaymentSuccess(),
            PaymentActions.loadPayments(),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [PaymentActions.savePaymentFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private paymentService: PaymentService,
  ) {}

  loadAll(): Observable<Payment[]> {
    return this.paymentService.getPayments();
  }

  loadPayment(paymentId: number): Observable<Payment> {
    return this.paymentService.getPaymentById(paymentId);
  }

  savePayment(payment: Payment) {
    return this.paymentService.savePayment(payment);
  }
}
