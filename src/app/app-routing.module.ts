import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeIdComponent } from './components/employee/employee-id/employee-id.component';
import { EmployeeRegisterComponent } from './components/employee/employee-register/employee-register.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HrRegisterComponent } from './components/employee/hr-register/hr-register.component';
import { HomeComponent } from './components/home/home.component';
import { SalaryComponent } from './components/salary/salary.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from "./shared/auth.guard";
const routes: Routes = [
  {path: '', redirectTo:'/log-in', pathMatch: 'full'},
  {path: 'log-in', component : SigninComponent},
  {path: 'sign-up', component : SignupComponent},
  {path: 'home', component : HomeComponent ,canActivate: [AuthGuard]},
  {path: 'salary', component : SalaryComponent ,canActivate: [AuthGuard]},
  {path: 'employee', component : EmployeeComponent ,canActivate: [AuthGuard]},
  {path: 'user-profile/:id', component : UserProfileComponent ,canActivate: [AuthGuard]},
  {path: 'employee/id/:emp_id', component : EmployeeIdComponent ,canActivate: [AuthGuard]},
  {path: 'employee/register', component : EmployeeRegisterComponent ,canActivate: [AuthGuard]},
  {path: 'employee/hr', component : HrRegisterComponent ,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [SigninComponent,
  SignupComponent,
  UserProfileComponent,
  HomeComponent,
  EmployeeComponent,
  EmployeeIdComponent,
  SalaryComponent,
  EmployeeRegisterComponent,
  HrRegisterComponent]
