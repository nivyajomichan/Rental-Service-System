import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ChatComponent } from './chat/chat.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ViewcompComponent } from './viewcomp/viewcomp.component';

const routes: Routes = [
  {path:'',redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'addproduct',component:AddproductComponent},
  {path:'cart',component:CartComponent},
  {path:'chat',component:ChatComponent},
  {path:'comp',component:ViewcompComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
