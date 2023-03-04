import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddproductComponent } from './addproduct/addproduct.component';
import { GMapComponent } from './g-map/g-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

import {MatDialogModule} from '@angular/material/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartComponent } from './cart/cart.component';
import { RatingComponent } from './rating/rating.component';
import { ComplainComponent } from './complain/complain.component';
import { ChatComponent } from './chat/chat.component';
import { ViewcompComponent } from './viewcomp/viewcomp.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AddproductComponent,
    GMapComponent,
    AddproductComponent,
    CartComponent,
    RatingComponent,
    ComplainComponent,
    ChatComponent,
    ViewcompComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,HttpClientModule,
    Ng2SearchPipeModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MdbModalModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  entryComponents: [GMapComponent]
})
export class AppModule { }
