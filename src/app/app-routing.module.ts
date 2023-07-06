import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/services/auth-guard-service';

const routes: Routes = [{
  path: 'registration', component: RegistrationComponent
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
},
{
  path: '**', component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
