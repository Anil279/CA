import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "./models/employee.model";

@Injectable({
  providedIn: "root",
})
export class GeneralService {
  constructor(private http: HttpClient) {}
  Employeesurl = "https://localhost:7278/api/Employee";
  AttendanceUrl = "https://localhost:7278/api/Attendance";

  getAttendance(year: number, month: number, empId: number): Observable<any> {
    return this.http.get(
      this.AttendanceUrl +
        `/GetAttendance?year=${year}&month=${month}&employeeId=${empId}`
    );
  }

  getEmployees(): Observable<any> {
    return this.http.get(this.Employeesurl + "/GetEmployees");
  }
  getRoles(): Observable<any> {
    return this.http.get(this.Employeesurl + "/GetRoles");
  }
  getDepartments(): Observable<any> {
    return this.http.get(this.Employeesurl + "/GetDeparments");
  }
  addEmployee(payload: any) {
    console.log("AddEmp", payload);
    return this.http.post(this.Employeesurl + "/AddEmployee", payload);
  }
  addRole(payload: any) {
    return this.http.post(this.Employeesurl + "/AddRole", payload);
  }
  addDepartment(payload: any) {
    return this.http.post(this.Employeesurl + "/AddDepartment", payload);
  }
  deleteEmployee(id: any) {
    return this.http.delete(this.Employeesurl + `/DeleteEmployeeById/${id}`);
  }
  deleteDeparment(id: any) {
    return this.http.delete(this.Employeesurl + `/DeleteDepartmentById/${id}`);
  }
  deleteRole(id: any) {
    return this.http.delete(this.Employeesurl + `/DeleteRoleById/${id}`);
  }
  editEmployee(payload: any) {
    console.log("UpdateEmp", payload);
    return this.http.put(this.Employeesurl + "/UpdateEmployee", payload);
  }
  editDepartment(payload: any) {
    return this.http.put(this.Employeesurl + "/UpdateDepartment", payload);
  }
  editRole(payload: any) {
    return this.http.put(this.Employeesurl + "/UpdateRole", payload);
  }

  // employees(){
  //   return this.http.get(this.Employeesurl+"GetEmployees");
  // }
}
