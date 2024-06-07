import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TemplateService } from './template.service';
import * as TemplateActions from './template.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Template } from '../payment.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TemplateEffects {
  loadTemplates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TemplateActions.loadTemplates),
      switchMap(() =>
        this.loadAll().pipe(
          switchMap((result) => [
            TemplateActions.loadTemplatesSuccess({ payload: result }),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [
              TemplateActions.loadTemplatesFailure({ error: error.error }),
            ];
          }),
        ),
      ),
    ),
  );

  saveTemplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TemplateActions.saveTemplate),
      switchMap(({ payload }) =>
        this.addTemplate(payload).pipe(
          switchMap(() => [
            TemplateActions.saveTemplateSuccess(),
            TemplateActions.loadTemplates(),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [
              TemplateActions.saveTemplateFailure({ error: error.error }),
            ];
          }),
        ),
      ),
    ),
  );

  deleteTemplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TemplateActions.deleteTemplate),
      switchMap(({ payload }) =>
        this.deleteTemplate(payload).pipe(
          switchMap(() => [
            TemplateActions.deleteTemplateSuccess(),
            TemplateActions.loadTemplates(),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [
              TemplateActions.deleteTemplateFailure({ error: error.error }),
            ];
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private templateService: TemplateService,
  ) {}

  loadAll(): Observable<Template[]> {
    return this.templateService.getTemplates();
  }

  addTemplate(template: Template) {
    return this.templateService.saveTemplate(template);
  }

  deleteTemplate(templateId: number) {
    return this.templateService.deleteTemplate(templateId);
  }
}
