import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';

import { LoginComponent } from './Pages/login/login.component';
import { ResetPasswordComponent } from './Pages/login/reset-password/reset-password.component';



const routes: Routes = [
 
{path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'forgotPassword', component:ForgotPasswordComponent},
  {path:'reset-password', component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
