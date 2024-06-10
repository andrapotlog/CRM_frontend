import { createAction, props } from '@ngrx/store';
import { ErrorModel } from '../error.interface';
import { Announcement } from './announcement.model';

export const loadAnnouncements = createAction(
  '[Announcement] Load Announcements',
  props<{ payload: number }>(),
);

export const loadAnnouncementsSuccess = createAction(
  '[Announcement] Load Announcements Success',
  props<{ payload: Announcement[] }>(),
);

export const loadAnnouncementsFailure = createAction(
  '[Announcement] Load Announcements Failure',
  props<{ error: ErrorModel }>(),
);

export const createAnnouncement = createAction(
  '[Announcement] Create Announcement',
  props<{ payload: Announcement; userLocation: number }>(),
);

export const createAnnouncementSuccess = createAction(
  '[Announcement] Create Announcement Success',
);

export const createAnnouncementFailure = createAction(
  '[Announcement] Create Announcement Failure',
  props<{ error: ErrorModel }>(),
);
