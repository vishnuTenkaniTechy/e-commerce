import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './item/cart/cart.component';
import { ViewitemComponent } from './viewitem/viewitem.component';
//import { RegisterComponentAdmin } from './admin/register/register.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminRegister', component: RegisterAdminComponent },
  { path: 'addItem', component: AddItemComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cartview/:id', component: ViewitemComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
