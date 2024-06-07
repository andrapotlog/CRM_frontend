import { createAction, props } from '@ngrx/store';
import { CardInformation } from '../payment.model';
import { ErrorModel } from '../../error.interface';

export const loadCards = createAction('[Card] Load Cards');
export const loadCardsSuccess = createAction(
  '[Card] Load Cards Success',
  props<{ payload: CardInformation[] }>(),
);
export const loadCardsFailure = createAction(
  '[Card] Load Cards Failure',
  props<{ error: ErrorModel }>(),
);

export const saveCard = createAction(
  '[Card] Save Card',
  props<{ payload: CardInformation }>(),
);
export const saveCardSuccess = createAction('[Card] Save Card Success');
export const saveCardFailure = createAction(
  '[Card] Save Card Failure',
  props<{ error: ErrorModel }>(),
);

export const deleteCard = createAction(
  '[Card] Delete Card',
  props<{ payload: number }>(),
);
export const deleteCardSuccess = createAction('[Card] Delete Card Success');
export const deleteCardFailure = createAction(
  '[Card] Delete Card Failure',
  props<{ error: ErrorModel }>(),
);
