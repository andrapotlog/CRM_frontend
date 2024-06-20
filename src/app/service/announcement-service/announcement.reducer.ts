import { createFeature, createReducer, on } from '@ngrx/store';
import { Nullable } from '../../../global.module';
import { Announcement } from './announcement.model';
import { ErrorModel } from '../error.interface';

import * as AnnouncementActions from './announcement.actions';

export interface State {
  announcements: Announcement[];
  error: Nullable<ErrorModel>;
  loading: boolean;
}

export const initialState: State = {
  announcements: [],
  error: null,
  loading: false,
};

export const announcementReducer = createReducer(
  initialState,

  on(AnnouncementActions.loadAnnouncements, (state) => ({
    ...state,
    loading: true,
  })),

  on(AnnouncementActions.loadAnnouncementsSuccess, (state, { payload }) => ({
    ...state,
    announcements: payload,
    loading: false,
  })),

  on(AnnouncementActions.loadAnnouncementsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(AnnouncementActions.createAnnouncement, (state, { payload }) => ({
    ...state,
    loading: true,
  })),

  on(AnnouncementActions.createAnnouncementSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(AnnouncementActions.createAnnouncementFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);

export const announcementFeature = createFeature({
  name: 'announcement',
  reducer: announcementReducer,
});

export const {
  name,
  reducer,
  selectAnnouncements,
  selectError,
  selectLoading,
} = announcementFeature;
