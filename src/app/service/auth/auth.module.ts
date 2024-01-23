import { NgModule } from '@angular/core';
import { RegisterComponent } from '../../authentication/register/register.component';
import { AuthRoutingModule } from '../../authentication/auth-routing.module';
import { LoginComponent } from '../../authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports: [],
})
export class AuthModule {}
