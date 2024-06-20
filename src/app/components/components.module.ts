import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { TrackRequestsComponent } from './track-requests/track-requests.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BaseChartDirective } from 'ng2-charts';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProfileComponent } from './profile/profile.component';
import { PaymentsComponent } from './payments/payments.component';
import { NgxMaskDirective } from 'ngx-mask';
import { SavedCardsDialogComponent } from './payments/saved-cards/saved-cards-dialogue.component';
import { NgOptimizedImage } from '@angular/common';
import { SavePaymentDialogComponent } from './payments/save-template/save-payment-dialog.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { RequestDialogComponent } from './track-requests/request-dialog/request-dialog.component';

@NgModule({
  declarations: [
    WelcomePageComponent,
    ServiceRequestComponent,
    TrackRequestsComponent,
    AnnouncementsComponent,
    DashboardComponent,
    ProfileComponent,
    PaymentsComponent,
    SavedCardsDialogComponent,
    SavePaymentDialogComponent,
    RequestDialogComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BaseChartDirective,
    MatButtonToggleModule,
    NgxMaskDirective,
    NgOptimizedImage,
    CdkDropList,
  ],
  exports: [],
})
export class ComponentsModule {}
