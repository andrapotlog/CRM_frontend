import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userFeature } from '././user-service/user.reducer';
import { UserEffects } from '././user-service/user.effects';
@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class CrmStoreModule {}
