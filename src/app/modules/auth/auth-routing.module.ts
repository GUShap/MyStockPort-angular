import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './cmps/login/login.component';
import { RegisterComponent } from './cmps/register/register.component';
import { ResetPassswordComponent } from './cmps/reset-passsword/reset-passsword.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'reset-password', component:ResetPassswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
