import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CardService } from './card.service';
import * as CardActions from './card.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CardInformation } from '../payment.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CardEffects {
  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.loadCards),
      switchMap(() =>
        this.loadAll().pipe(
          switchMap((result) => [
            CardActions.loadCardsSuccess({ payload: result }),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [CardActions.loadCardsFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );

  saveCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.saveCard),
      switchMap(({ payload }) =>
        this.addCard(payload).pipe(
          switchMap(() => [
            CardActions.saveCardSuccess(),
            CardActions.loadCards(),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [CardActions.saveCardFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );

  deleteCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.deleteCard),
      switchMap(({ payload }) =>
        this.deleteCard(payload).pipe(
          switchMap(() => [
            CardActions.deleteCardSuccess(),
            CardActions.loadCards(),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [CardActions.deleteCardFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private cardService: CardService,
  ) {}

  loadAll(): Observable<CardInformation[]> {
    return this.cardService.getCardsDetails();
  }

  addCard(card: CardInformation) {
    return this.cardService.saveCard(card);
  }

  deleteCard(cardId: number) {
    return this.cardService.deleteCard(cardId);
  }
}
