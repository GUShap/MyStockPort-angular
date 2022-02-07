import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './modules/auth/cmps/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import {ContactsComponent} from 'src/app/modules/contacts/contacts.component'

const routes: Routes = [{
  path:'login',
  component: LoginComponent
},{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path:'contacts',
    component: ContactsComponent
  }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
