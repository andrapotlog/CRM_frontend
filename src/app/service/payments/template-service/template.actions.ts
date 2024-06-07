import { createAction, props } from '@ngrx/store';
import { Template } from '../payment.model';
import { ErrorModel } from '../../error.interface';

export const loadTemplates = createAction('[Template] Load Templates');
export const loadTemplatesSuccess = createAction(
  '[Template] Load Templates Success',
  props<{ payload: Template[] }>(),
);
export const loadTemplatesFailure = createAction(
  '[Template] Load Templates Failure',
  props<{ error: ErrorModel }>(),
);

export const saveTemplate = createAction(
  '[Template] Save Template',
  props<{ payload: Template }>(),
);
export const saveTemplateSuccess = createAction(
  '[Template] Save Template Success',
);
export const saveTemplateFailure = createAction(
  '[Template] Save Template Failure',
  props<{ error: ErrorModel }>(),
);

export const deleteTemplate = createAction(
  '[Template] Delete Template',
  props<{ payload: number }>(),
);
export const deleteTemplateSuccess = createAction(
  '[Template] Delete Template Success',
);
export const deleteTemplateFailure = createAction(
  '[Template] Delete Template Failure',
  props<{ error: ErrorModel }>(),
);
