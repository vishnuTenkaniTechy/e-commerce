import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularmaterialModule } from './angularmaterial/angularmaterial.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { HeaderComponent } from './header/header.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './item/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RegisterAdminComponent,
    AddItemComponent,
    HeaderComponent,
    DashboardComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularmaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
