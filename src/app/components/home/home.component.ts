import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emp_id:any = ""
  decodel:any
  constructor() { }

  ngOnInit(): void {
    
  }

}
