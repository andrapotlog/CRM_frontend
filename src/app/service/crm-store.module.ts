import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userFeature } from './user-service/user.reducer';
import { UserEffects } from './user-service/user.effects';
import {announcementFeature,} from "./announcement-service/announcement.reducer";
import {AnnouncementEffects} from "./announcement-service/announcement.effects";
import {requestFeature} from "./request-service/request.reducer";
import {RequestEffects} from "./request-service/request.effects";
@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forFeature(userFeature),
    StoreModule.forFeature(announcementFeature),
    StoreModule.forFeature(requestFeature),
    EffectsModule.forFeature([UserEffects, AnnouncementEffects, RequestEffects]),
  ],
})
export class CrmStoreModule {}
