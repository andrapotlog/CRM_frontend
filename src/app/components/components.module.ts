import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {ServiceRequestComponent} from "./service-request/service-request.component";
import {TrackRequestsComponent} from "./track-requests/track-requests.component";
import {FinancialComponent} from "./financial/financial.component";
import {AnnouncementsComponent} from "./announcements/announcements.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BaseChartDirective} from "ng2-charts";

@NgModule({
  declarations: [
    WelcomePageComponent,
    ServiceRequestComponent,
    TrackRequestsComponent,
    FinancialComponent,
    AnnouncementsComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BaseChartDirective,
  ],
  exports: [],
})
export class ComponentsModule {}
