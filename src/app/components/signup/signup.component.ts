import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:any = FormGroup
  constructor(
    public fb:FormBuilder,
    public authService: AuthService,
    public router : Router
  ) {
    this.signupForm = this.fb.group({
      first_name:[''],
      last_name:[''],
      gender:[''],
      email:[''],
      password:[''],
      number:['']
    })
   }

  ngOnInit(): void {
    
  }
  registerUser(){
    console.log(this.signupForm.value)
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      console.log(res)
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate(['log-in']);
      }
    });
  }
}
