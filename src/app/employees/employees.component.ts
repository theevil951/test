import { Component, OnInit } from '@angular/core';
import { employee } from 'src/employee';
import { employees } from '../employees';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }


  searchInput : string = "";
search : string = "";
employeeList :employee[] = [];
  searchEmps():void{
    this.search = this.searchInput;
    console.log(this.search);
    this.employeeList = [];
    for(let employee of employees){
      let empdetails = (employee.firstname + employee.lastname + employee.phone + employee.id).toLowerCase();
      if(empdetails.includes(this.search.toLowerCase()))
      this.employeeList.push(employee);
    }
  }

employees = employees

selectedEmployee?:employee;

getDetails(employee:employee):void{
this.selectedEmployee = employee;
}

}
