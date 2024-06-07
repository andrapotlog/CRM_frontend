import { createFeature, createReducer, on } from '@ngrx/store';
import * as CardActions from './card.actions';
import { CardInformation } from '../payment.model';
import { Nullable } from '../../../../global.module';
import { ErrorModel } from '../../error.interface';

export interface CardState {
  cards: CardInformation[];
  loading: boolean;
  error: Nullable<ErrorModel>;
}

export const initialState: CardState = {
  cards: [],
  loading: false,
  error: null,
};

export const cardReducer = createReducer(
  initialState,
  on(CardActions.loadCards, (state) => ({ ...state, loading: true })),
  on(CardActions.loadCardsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    cards: payload,
  })),
  on(CardActions.loadCardsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(CardActions.saveCard, (state) => ({ ...state, loading: true })),
  on(CardActions.saveCardSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(CardActions.saveCardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CardActions.deleteCard, (state) => ({ ...state, loading: true })),
  on(CardActions.deleteCardSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(CardActions.deleteCardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const cardFeature = createFeature({
  name: 'card',
  reducer: cardReducer,
});

export const { name, reducer, selectCards, selectError, selectLoading } =
  cardFeature;
