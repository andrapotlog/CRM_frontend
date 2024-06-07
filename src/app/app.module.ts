import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './service/auth/auth.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { FlexModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { reducers } from './app.reducer';
import { AuthService } from './service/auth/auth.service';
import { UserService } from './service/user-service/user.service';
import { EffectsModule } from '@ngrx/effects';
import { CrmStoreModule } from './service/crm-store.module';
import { ComponentsModule } from './components/components.module';
import { AnnouncementService } from './service/announcement-service/announcement.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    ComponentsModule,
    FlexModule,
    CrmStoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    NgbModule,
    NgxMaskDirective,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    AuthService,
    UserService,
    AnnouncementService,
    provideNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
