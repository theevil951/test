import { Component, OnInit } from '@angular/core';
import { employee } from 'src/employee';
import { employees } from 'src/employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (!localStorage.getItem("employees"))
      localStorage.setItem("employees", JSON.stringify(employees))

  }

  employees = JSON.parse(localStorage.getItem("employees")!);

  //search
  searchInput: string = ""; // From ngModel
  search: string = ""; // takes searchInput as a whole 
  employeeList: employee[] = [];

  searchEmps(): void {
    this.search = this.searchInput;
    // console.log(this.search);
    this.employeeList = [];
    for (let employee of this.employees) {
      console.log(employee);

      let empdetails = (employee.firstname + employee.lastname + employee.phone + employee.id).toLowerCase();
      if (empdetails.includes(this.search.toLowerCase()))
        this.employeeList.push(employee);
    }

  }
  //end of search
  
  selectedEmployee?: employee;
  getDetails(employee: employee): void {
    this.selectedEmployee = employee;
  }
  closeDetails(): void {
    this.selectedEmployee = undefined;
  }

  //entry

  id: number = 0;
  firstname: string = "";
  lastname: string = "";
  number: number = 0;
  newEmployee?: employee;

  insertEmployee(): void {
    this.newEmployee = {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.number,
    };
    if (this.id == 0 || isNaN(this.id)) {
      alert("ID Can't be 0 or NaN")
      return;
    }
    let currentEmployees = JSON.parse(localStorage.getItem("employees")!);
    currentEmployees.push(this.newEmployee)
    localStorage.setItem("employees", JSON.stringify(currentEmployees))
    location.reload()
  }

  //end of entry


  //Deletion
  delete(employee: employee): void {

    let currentEmployees = JSON.parse(localStorage.getItem("employees")!);
    let id = employee.id;
    console.log(id);
    let index = currentEmployees.findIndex((x: any) => x.id === id)
    console.log(index);
    console.log(currentEmployees);
    currentEmployees.splice(index, 1)

    localStorage.setItem("employees", JSON.stringify(currentEmployees));
    location.reload()
  }
  //End of Deletion


  //Update

  update(employee: employee): void {
    let currentEmployees = JSON.parse(localStorage.getItem("employees")!);
    let id = employee.id;
    console.log(id);
    let index = currentEmployees.findIndex((x: any) => x.id === id)
    console.log(index);
    console.log(currentEmployees);
    if (this.firstname == "") {
      this.firstname = currentEmployees[index].firstname;
    }
    if (this.lastname == "") {
      this.lastname = currentEmployees[index].lastname;
    }
    if (this.number == 0 || this.number == undefined) {
      this.number = currentEmployees[index].phone;
      console.log(this.number);

    }
    currentEmployees[index].firstname = this.firstname;
    currentEmployees[index].lastname = this.lastname;
    currentEmployees[index].phone = this.number;

    localStorage.setItem("employees", JSON.stringify(currentEmployees));
    location.reload()


  }

  //End of Update
}
