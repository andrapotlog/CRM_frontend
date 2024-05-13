import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './service/auth/auth.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { FlexModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { reducers } from './app.reducer';
import { AuthService } from './service/auth/auth.service';
import { UserService } from './service/userService/user.service';
import { EffectsModule } from '@ngrx/effects';
import { CrmStoreModule } from './service/crm-store.module';
import { PersonalProfileComponent } from './profile/personal-profile/personal-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavbarComponent,
    PersonalProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    FlexModule,
    CrmStoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    AuthService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
