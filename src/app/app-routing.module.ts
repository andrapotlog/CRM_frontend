import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { authGuard } from './service/auth/guards/auth-guard.guard';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { TrackRequestsComponent } from './components/track-requests/track-requests.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { PaymentsComponent } from './components/payments/payments.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'service-request',
    component: ServiceRequestComponent,
    canActivate: [authGuard],
  },
  {
    path: 'track-request',
    component: TrackRequestsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'payment',
    component: PaymentsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
