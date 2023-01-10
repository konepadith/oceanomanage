import { Component, OnInit,Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-employee-all',
  templateUrl: './employee-all.component.html',
  styleUrls: ['./employee-all.component.css']
})
export class EmployeeAllComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
test(){
  console.log("hello")
}
  addNewItem(value: any) {
    this.newItemEvent.emit(value);
  }
}
