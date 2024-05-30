import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {catchError, Observable, switchMap} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import {Announcement} from "./announcement.model";
import {AnnouncementService} from "./announcement.service";
import * as AnnouncementActions from './announcement.actions';

@Injectable()
export class AnnouncementEffects {
  loadAnnouncement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnouncementActions.loadAnnouncements),
      switchMap(() =>
        this.loadAll().pipe(
          switchMap((result) => [
            AnnouncementActions.loadAnnouncementsSuccess({ payload: result }),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [AnnouncementActions.loadAnnouncementsFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );

  createAnnouncemet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnouncementActions.createAnnouncement),
      switchMap(({ payload }) =>
        this.createUser(payload).pipe(
          switchMap(() => [AnnouncementActions.createAnnouncementSuccess({payload})]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [AnnouncementActions.createAnnouncementFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );

  /*loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.loadUser().pipe(
          switchMap((result) => [
            UserActions.loadUserSuccess({ payload: result }),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return [UserActions.loadUsersFailure({ error: error.error })];
          }),
        ),
      ),
    ),
  );
*/
  constructor(
    private actions$: Actions,
    private store: Store,
    private announcementService: AnnouncementService,
  ) {}

  loadAll(): Observable<Announcement[]> {
    const req = this.announcementService.getAnnouncements();
    return this.announcementService.getAnnouncements();/*.pipe(
      map(result => AnnouncementMapper.mapAnnouncements(result))
    ).subscribe(res=> console.log(res));

    return req;*/
  }

  createUser(payload: Announcement) {
    return this.announcementService.createAnnouncement(payload);
  }

 /* loadUser(): Observable<UserModel> {
    return this.userService.getUser();
  }*/
}
