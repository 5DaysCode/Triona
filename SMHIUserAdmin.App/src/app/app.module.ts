import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JESTTestComponent } from './jesttest/jesttest.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './interceptors/header.service';
import { ErrorInterceptor } from './interceptors/error.service';

// Importing the necessary NgRx modules and configurations
import { StoreModule } from '@ngrx/store';
import { appReducers } from './state';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEffects } from './store/effects/user.effects';
import { EffectsModule } from '@ngrx/effects';
import  { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule } from '@angular/forms';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    JESTTestComponent,
    WelcomeComponent,
    UserListComponent,
    AddUserFormComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),  //NgRx store initialization 
    EffectsModule.forRoot([UserEffects]),  // Register the UserEffects here
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // ... your other providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
