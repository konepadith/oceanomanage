import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // token:any = localStorage.getItem("access_token");
  // detoken:any
  // id:any
  constructor(public authService: AuthService) { 
if (localStorage.getItem("access_token")) {
  console.log("have")
}
    // console.log(jwt_decode(this.token))
    // this.detoken=jwt_decode(this.token)
    // this.id=this.detoken.result.employee_id
  }

  logout() {
    this.authService.doLogout()
  }
}
