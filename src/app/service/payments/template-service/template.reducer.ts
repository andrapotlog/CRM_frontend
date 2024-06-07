import { createFeature, createReducer, on } from '@ngrx/store';
import * as TemplateActions from './template.actions';
import { Template } from '../payment.model';
import { Nullable } from '../../../../global.module';
import { ErrorModel } from '../../error.interface';

export interface TemplateState {
  templates: Template[];
  loading: boolean;
  error: Nullable<ErrorModel>;
}

export const initialState: TemplateState = {
  templates: [],
  loading: false,
  error: null,
};

export const templateReducer = createReducer(
  initialState,
  on(TemplateActions.loadTemplates, (state) => ({ ...state, loading: true })),
  on(TemplateActions.loadTemplatesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    templates: payload,
  })),
  on(TemplateActions.loadTemplatesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(TemplateActions.saveTemplate, (state) => ({ ...state, loading: true })),
  on(TemplateActions.saveTemplateSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(TemplateActions.saveTemplateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TemplateActions.deleteTemplate, (state) => ({ ...state, loading: true })),
  on(TemplateActions.deleteTemplateSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(TemplateActions.deleteTemplateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const templateFeature = createFeature({
  name: 'template',
  reducer: templateReducer,
});

export const { name, reducer, selectTemplates, selectError, selectLoading } =
  templateFeature;
