import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { GeneralService } from "app/general.service";
import { UserProfileComponent } from "app/user-profile/user-profile.component";
import * as Chartist from "chartist";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.css"],
})
export class DesignationComponent implements OnInit {
  headers = ["name"];
  roles = [
    { id: 1, roleId: 1, name: "Trainee" },
    { id: 2, roleId: 2, name: "manager" },
    { id: 3, roleId: 3, name: "Associate" },
  ];
  departments = [
    { id: 1, roleId: 1, name: "Developer" },
    { id: 2, roleId: 2, name: "SNA" },
    { id: 3, roleId: 3, name: "Testing" },
  ];

  constructor(
    private router: Router,
    private generalService: GeneralService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    if (!authService.getLoginStatus()) {
      this.router.navigate(["/login"]);
    }
  }
  ngOnInit() {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    this.callRolesGet();
    this.callDepartmentsGet();
  }

  editRole(role) {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: "500px",
      data: {
        empDetails: role,
        title: "Edit Role",
        button: "Update",
        name: "Role",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result["id"] = role.id;
        console.log(result);

        this.callEditRolePut(result);
      }
    });
  }

  deleteRole(roleDetails) {
    console.log(roleDetails);
    this.callDelteRoleDelete(roleDetails.id);
  }

  addRole() {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: "500px",
      data: {
        empDetails: {},
        title: "Add Role",
        button: "Add",
        id: this.departments.length,
        name: "Role",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        this.callAddRolePost(result);
      }
    });
  }

  editDepartment(role) {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: "500px",
      data: {
        empDetails: role,
        title: "Edit Department",
        button: "Update",
        name: "Department",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result["id"] = role.id;
        console.log(result);

        this.callEditDepartmentPut(result);
      }
    });
  }

  deleteDepartment(roleDetails) {
    console.log(roleDetails);
    this.callDelteDepartmentDelete(roleDetails.id);
  }

  addDepartment() {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: "500px",
      data: {
        empDetails: {},
        title: "Add Department",
        button: "Add",
        id: this.departments.length,
        name: "Department",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        this.callAddDepartmentPost(result);
      }
    });
  }
  callRolesGet() {
    this.generalService.getRoles().subscribe((result: any) => {
      if (result) {
        this.roles = result;
        localStorage.setItem("roles", JSON.stringify(this.roles));
        console.log(result);
      }
    });
  }
  callDepartmentsGet() {
    this.generalService.getDepartments().subscribe((result: any) => {
      if (result) {
        this.departments = result;
        localStorage.setItem("departments", JSON.stringify(this.departments));
        console.log(result);
      }
    });
  }
  callAddRolePost(payload) {
    this.generalService.addRole(payload).subscribe(
      (result: any) => {
        if (result) {
          console.log(result);
        }
      },
      (error) => {
        if (error) {
          console.log(error);
          this.callRolesGet();
        }
      }
    );
  }
  callAddDepartmentPost(payload) {
    this.generalService.addDepartment(payload).subscribe(
      (result: any) => {
        if (result) {
          console.log(result);
        }
      },
      (error) => {
        if (error) {
          console.log(error);
          this.callDepartmentsGet();
        }
      }
    );
  }
  callDelteRoleDelete(id) {
    this.generalService.deleteRole(id).subscribe(
      (result: any) => {
        if (result) {
          console.log(result);
        }
      },
      (error) => {
        if (error) {
          console.log(error);
          this.callRolesGet();
        }
      }
    );
  }
  callDelteDepartmentDelete(id) {
    this.generalService.deleteDeparment(id).subscribe(
      (result: any) => {
        if (result) {
          console.log(result);
        }
      },
      (error) => {
        if (error) {
          console.log(error);
          this.callDepartmentsGet();
        }
      }
    );
  }

  callEditRolePut(payload) {
    this.generalService.editRole(payload).subscribe(
      (result: any) => {
        if (result) {
          console.log(result);
        }
      },
      (error) => {
        if (error) {
          console.log(error);
          this.callRolesGet();
        }
      }
    );
  }
  callEditDepartmentPut(payload) {
    this.generalService.editDepartment(payload).subscribe(
      (result: any) => {
        if (result) {
          console.log(result);
        }
      },
      (error) => {
        if (error) {
          console.log(error);
          this.callDepartmentsGet();
        }
      }
    );
  }
}
