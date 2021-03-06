import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';

import {Employee} from '../shared/employee.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];
  constructor(private employeeService: EmployeeService, private toastr:ToastrService) { }

  ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(elem=> {
        var y = elem.payload.toJSON();
        y['$key'] = elem.key;
        console.log(y['$key'])
        this.employeeList.push(y as Employee);
        
      })
    });
  }

  onEdit(emp : Employee){
    console.log(emp)
    this.employeeService.selectedEmployee = Object.assign({},emp);
  }
  onDelete(key:string){
    console.log(key)
    this.employeeService.deleteEmployee(key);
    this.toastr.warning("Работник удален!")
  }
}
