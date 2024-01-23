import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PersonalProfileComponent } from './profile/personal-profile/personal-profile.component';
import { authGuard } from './service/auth/auth-guard.guard';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  {
    path: 'profile',
    component: PersonalProfileComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
