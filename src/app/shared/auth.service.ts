import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // endpoint: string = 'https://oceanolimited.com/api';
  emp_id:any = ""
  decodel:any
  endpoint: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/employee/`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/employee/login`, user)
      .subscribe((res: any) => {
        if (res.success == 1) {
          localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id).subscribe((res) => {
          console.log(res)
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.data[0].employee_id]);
        });
        } else {
          console.log(res)
        }
        
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    this.emp_id = localStorage.getItem("access_token");
    this.decodel =jwt_decode(this.emp_id)
    let api = `${this.endpoint}/employee/${this.decodel.result.employee_id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}