import { Component, OnInit,Input,Output } from '@angular/core';

@Component({
  selector: 'app-employee-id',
  templateUrl: './employee-id.component.html',
  styleUrls: ['./employee-id.component.css']
})
export class EmployeeIdComponent implements OnInit {
  @Input() item = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
