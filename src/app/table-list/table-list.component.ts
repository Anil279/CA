import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { GeneralService } from "app/general.service";
import { UserProfileComponent } from "app/user-profile/user-profile.component";

@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.css"],
})
export class TableListComponent implements OnInit {
  constructor(
    private generalService: GeneralService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.callAddEmployeeGet();
  }
  roles = [];
  departments = [];
  headers = [
    { id: "email", name: "Email" },
    { id: "empId", name: "Employee Id" },
    { id: "empName", name: "Employee Name" },
    { id: "phoneNo", name: "Phone Number" },
    { id: "address", name: "Address" },
    { id: "roleId", name: "Role name" },
    { id: "departmentId", name: "Department name" },
  ];
  employeeData = [
    {
      id: 1,
      email: "anil@gmail.com",
      empId: 101,
      empName: "Anil",
      phoneNo: 9019922332,
      address: "Kakinada",
      roleId: 1,
      departmentId: 1,
      roleName: 1,
      departmentName: 1,
    },
    {
      id: 2,
      email: "test@gmail.com",
      empId: 102,
      empName: "Test",
      phoneNo: 9013456355,
      address: "Hyderabad",
      roleId: 2,
      departmentId: 1,
      roleName: 1,
      departmentName: 1,
    },
    {
      id: 3,
      email: "test1@gmail.com",
      empId: 103,
      empName: "Test1",
      phoneNo: 9019922332,
      address: "Kakinada",
      roleId: 1,
      departmentId: 2,
      roleName: 1,
      departmentName: 1,
    },
    {
      id: 4,
      email: "test2@gmail.com",
      empId: 104,
      empName: "Test2",
      phoneNo: 9013456355,
      address: "Hyderabad",
      roleId: 2,
      departmentId: 2,
      roleName: 1,
      departmentName: 1,
    },
  ];

  callDelteEmployeeDelete(id) {
    this.generalService.deleteEmployee(id).subscribe((result: any) => {
      if (result) {
        this.callAddEmployeeGet();

        console.log(result);
        console.log(this.employeeData);
      }
    });
  }

  deleteDetails(empDetails) {
    console.log(empDetails);
    this.callDelteEmployeeDelete(empDetails.id);
  }
  callAddEmployeeGet() {
    this.roles = JSON.parse(localStorage.getItem("roles"));
    this.departments = JSON.parse(localStorage.getItem("departments"));
    this.generalService.getEmployees().subscribe((result: any) => {
      if (result) {
        this.employeeData = [];
        for (let i = 0; i < result.length; i++) {
          var employee = {
            id: result[i].id,
            email: result[i].email,
            empId: result[i].empId,
            empName: result[i].empName,
            phoneNo: result[i].phoneNumber,
            address: result[i].address1,
            roleId: result[i].roleId,
            departmentId: result[i].departmentId,
            roleName: this.roles.find((x) => x.id == result[i].roleId).name,
            departmentName: this.departments.find(
              (x) => x.id == result[i].departmentId
            ).name,
          };
          this.employeeData.push(employee);
        }
        console.log(this.employeeData, this.roles, this.departments);
      }
    });
  }
  callAddEmployeePost(payload) {
    console.log("AddEmp", payload);
    this.generalService.addEmployee(payload).subscribe((result: any) => {
      if (result) {
        this.callAddEmployeeGet();
        console.log(result);
        console.log(this.employeeData);
      }
    });
  }
  addEmployeeDetails() {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: "500px",
      data: {
        empDetails: {},
        title: "Add Employee Details",
        button: "Add",
        id: this.employeeData.length,
        name: "table",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.callAddEmployeePost(result);
      }
    });
  }
  callEditEmployeePut(payload) {
    this.generalService.editEmployee(payload).subscribe((result: any) => {
      if (result) {
        this.callAddEmployeeGet();
        console.log(result);
        console.log(this.employeeData);
      }
    });
  }

  editDetails(empDetails) {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: "500px",
      data: {
        empDetails: empDetails,
        title: "Edit Details",
        button: "Update",
        name: "table",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result["id"] = empDetails.id;
        console.log(result);
        this.callEditEmployeePut(result);
      }
    });
  }
}
