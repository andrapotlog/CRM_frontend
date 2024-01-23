import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../service/auth/auth-guard.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [!authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [!authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
