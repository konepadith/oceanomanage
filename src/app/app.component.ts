import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) { }

  logout() {
    this.authService.doLogout()
  }
}
