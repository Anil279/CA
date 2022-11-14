import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { GeneralService } from "app/general.service";
import { UserProfileComponent } from "app/user-profile/user-profile.component";
import { element } from "protractor";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.css"],
})
export class AttendanceComponent implements OnInit {
  employeeId: number;
  year: number;
  month: number;
  alert: string;
  public addFormGroup!: FormGroup;
  tabelArray: Array<any> = [];
  processCompleted: boolean;
  constructor(
    private fb: FormBuilder,
    private generalService: GeneralService,
    public dialog: MatDialog
  ) {
    this.bindData();
  }
  years = [
    {
      id: 2023,
      text: "2023",
    },
    {
      id: 2022,
      text: "2022",
    },
    {
      id: 2021,
      text: "2021",
    },
  ];
  startDate = new Date("2022-10-01");
  endDate = new Date("2022-11-30");
  title = "Project";
  headers = ["date", "present", "workingHours", "regulized"];
  months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "Augest" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];
  Year = [2021, 2022];
  bindData() {
    this.addFormGroup = this.fb.group({
      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.endDate),
    });
  }
  ngOnInit(): void {}
  search() {
    if (this.year == undefined) {
      this.alert = "Please select year";
    } else if (this.month == undefined) {
      this.alert = "Please select month";
    } else if (this.employeeId == undefined) {
      this.alert = "please enter employee id";
    } else {
      this.alert = null;
      this.generalService
        .getAttendance(this.year, this.month, this.employeeId)
        .subscribe((result: any) => {
          if (result) {
            let id = 1;
            for (let i = 0; i < result.length; i++) {
              let parameters = { id: id, isChecked: false };
              parameters["date"] = result[i].date.split("T");
              parameters["present"] = result[i].present;
              parameters["workingHours"] = result[i].workingHours;
              parameters["regulized"] = result[i].regulized;
              this.tabelArray.push(parameters);
            }
            this.processCompleted = true;
          }

          //console.log(this.year, this.month, this.employeeId);
          // console.log(this.addFormGroup);
          // let startDate = new Date(this.addFormGroup.value.startDate);
          // let endDate = new Date(this.addFormGroup.value.endDate);
          // let id = 1;
          // while (endDate > startDate) {
          //   let parameters = { id: id, isChecked: false };
          //   let a = new Date(startDate).toLocaleString().split(",");
          //   parameters["date"] = a[0];
          //   parameters["startTime"] = "10:00";
          //   parameters["endTime"] = "07:00";
          //   if (startDate.getDay() == 0) {
          //     parameters["status"] = "Holiday";
          //   } else {
          //     parameters["status"] = "absent";
          //   }
          //   this.tabelArray.push(parameters);
          //   id++;
          //   startDate.setDate(startDate.getDate() + 1);
          //   console.log(this.tabelArray);
          //}
          //this.processCompleted = true;
        });
    }
  }

  regularize() {
    let arrayofDays = [];
    console.log(this.tabelArray);
    this.tabelArray.forEach((element) => {
      if (element.isChecked) {
        arrayofDays.push(element);
      }
    });
    console.log(arrayofDays);
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: "1500px",
      data: {
        empDetails: arrayofDays,
        title: "Regularize attendance",
        button: "Ok",
        id: "",
        name: "attendance",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        // this.employeeData.push(result);
        console.log(result);
      }
    });
  }
  onYearChange(event: any) {
    this.year = event.value;
  }
  onMonthChange(event: any) {
    this.month = event.value;
  }
}
