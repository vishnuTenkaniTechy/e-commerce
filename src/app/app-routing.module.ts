import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './item/cart/cart.component';
import { ViewitemComponent } from './viewitem/viewitem.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminRegister', component: RegisterAdminComponent },
  { path: 'addItem', component: AddItemComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'cartview/:id', component: ViewitemComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: "edit/:itemId", component: AddItemComponent, canActivate: [AuthGuard, AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule { }
