import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from "./../../shared/auth.guard";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      employee_email: [''],
      employee_pass: [''],
    });
  }
  ngOnInit() {

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/'])
    }

  }
  loginUser() {
    this.authService.signIn(this.signinForm.value)
  }


}
