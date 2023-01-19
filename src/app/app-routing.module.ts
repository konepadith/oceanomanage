import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeIdComponent } from './components/employee/employee-id/employee-id.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from "./shared/auth.guard";
const routes: Routes = [
  {path: '', redirectTo:'/log-in', pathMatch: 'full'},
  {path: 'log-in', component : SigninComponent},
  {path: 'sign-up', component : SignupComponent},
  {path: 'home', component : HomeComponent ,canActivate: [AuthGuard]},
  {path: 'employee', component : EmployeeComponent ,canActivate: [AuthGuard]},
  {path: 'user-profile/:id', component : UserProfileComponent ,canActivate: [AuthGuard]},
  {path: 'employee/:emp_id', component : EmployeeIdComponent ,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [SigninComponent,SignupComponent,UserProfileComponent,HomeComponent,EmployeeComponent,EmployeeIdComponent]
