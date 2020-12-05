import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { CusFormComponent } from './components/cus-form/cus-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'ui/login', pathMatch: 'full' },
  { path: 'ui/login', component: LoginComponent },
  { path: 'ui/cusForm', component: CusFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
