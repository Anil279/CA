import { Component, OnInit, Inject } from "@angular/core";
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { eventNames } from "process";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent {
  public addFormGroup: FormGroup;
  EmployeeDetails;
  RoleorDepartmentDetails;
  tableDialog: boolean;
  roleorDepartment: boolean;
  attendanceDialog: boolean;
  roles = [];
  departments = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    if (data.name === "table") {
      this.EmployeeDetails = data.empDetails;
      this.tableDialog = true;
      this.roleorDepartment = false;
      this.bindInitialData();
    } else if (data.name === "Role" || data.name === "Department") {
      this.EmployeeDetails = data.empDetails;
      this.tableDialog = false;
      this.roleorDepartment = true;
      this.bindRoleorDepartmentData();
    } else if (data.name === "attendance") {
      this.EmployeeDetails = data.empDetails;
      this.tableDialog = false;
      this.roleorDepartment = false;
      this.attendanceDialog = true;
      console.log(this.EmployeeDetails);
      this.bindLeaveorAttendanceData();
    }
  }

  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem("roles"));
    this.departments = JSON.parse(localStorage.getItem("departments"));
  }

  bindInitialData() {
    this.addFormGroup = this.fb.group({
      email: new FormControl(this.EmployeeDetails.email, Validators.required),
      empId: new FormControl(this.EmployeeDetails.empId, Validators.required),
      empName: new FormControl(
        this.EmployeeDetails.empName,
        Validators.required
      ),
      phoneNumber: new FormControl(
        this.EmployeeDetails.phoneNo,
        Validators.required
      ),
      address1: new FormControl(
        this.EmployeeDetails.address,
        Validators.required
      ),
      roleId: new FormControl(
        this.EmployeeDetails.roleId || 2,
        Validators.required
      ),
      departmentId: new FormControl(
        this.EmployeeDetails.departmentId || 1,
        Validators.required
      ),
    });
  }

  bindRoleorDepartmentData() {
    this.addFormGroup = this.fb.group({
      name: new FormControl(this.EmployeeDetails.name, Validators.required),
    });
  }

  bindLeaveorAttendanceData() {
    this.addFormGroup = this.fb.group({
      date: new FormControl(this.EmployeeDetails.date),
      startTime: new FormControl(
        this.EmployeeDetails.startTime,
        Validators.required
      ),
      endTime: new FormControl(
        this.EmployeeDetails.endTime,
        Validators.required
      ),
      textMessage: new FormControl(),
    });
  }

  onNoClick(): void {
    console.log(this.addFormGroup);
    this.dialogRef.close();
  }

  onSubmit() {
    console.log("onSubmit", this.addFormGroup);
    console.log("onSubmit", this.EmployeeDetails);
  }

  onRoleChange(event: any) {
    //this.EmployeeDetails.roleId = event.value;
    let roleId = event.value;
    if (this.addFormGroup["roleId"]) {
      this.addFormGroup["roleId"].setValue(["roleId"], {
        onlySelf: true,
        roleId,
      });
    } else {
      this.EmployeeDetails.roleId = event.value;
    }
    //this.bindInitialData();
  }

  onDepartmentChange(event: any) {
    //this.EmployeeDetails.departmentId = event.value;
    let departmentId = event.value;
    if (this.addFormGroup["departmentId"]) {
      this.addFormGroup["departmentId"].setValue(["departmentId"], {
        onlySelf: true,
        departmentId,
      });
    } else {
      this.EmployeeDetails.departmentId = event.value;
    }
    //this.bindInitialData();
  }
  compareCategoryObjects(object1: any, object2: any) {
    console.log(object1, object2);
    return object1 && object2 && object1.id == object2.id;
  }
}
