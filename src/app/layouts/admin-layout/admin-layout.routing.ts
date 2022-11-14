import { Routes } from "@angular/router";

import { DesignationComponent } from "../../Designation/designation.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { AttendanceComponent } from "../../attendance/attendance.component";

import { LoginComponent } from "app/login/login.component";

export const AdminLayoutRoutes: Routes = [
  { path: "Designation", component: DesignationComponent },

  { path: "employee-list", component: TableListComponent },
  { path: "attendance", component: AttendanceComponent },
];
