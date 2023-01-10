import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
switchCompoent:any = 1

items :any;

  addItem(newItem: string) {
    console.log(newItem)
    this.items= newItem;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
