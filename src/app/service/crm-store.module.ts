import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userFeature } from './user-service/user.reducer';
import { UserEffects } from './user-service/user.effects';
import { announcementFeature } from './announcement-service/announcement.reducer';
import { AnnouncementEffects } from './announcement-service/announcement.effects';
import { requestFeature } from './request-service/request.reducer';
import { RequestEffects } from './request-service/request.effects';
import { TemplateEffects } from './payments/template-service/template.effects';
import { CardEffects } from './payments/cards-service/card.effects';
import { PaymentEffects } from './payments/payment-service/payment.effects';
import { templateFeature } from './payments/template-service/template.reducer';
import { cardFeature } from './payments/cards-service/card.reducer';
import { paymentFeature } from './payments/payment-service/payment.reducer';

@NgModule({ declarations: [], imports: [StoreModule.forFeature(userFeature),
        StoreModule.forFeature(announcementFeature),
        StoreModule.forFeature(requestFeature),
        StoreModule.forFeature(templateFeature),
        StoreModule.forFeature(cardFeature),
        StoreModule.forFeature(paymentFeature),
        EffectsModule.forFeature([
            UserEffects,
            AnnouncementEffects,
            RequestEffects,
            TemplateEffects,
            CardEffects,
            PaymentEffects,
        ])], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CrmStoreModule {}
