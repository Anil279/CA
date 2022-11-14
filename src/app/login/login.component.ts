import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: any;
  loginSuccess=false;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      "Email":new FormControl('',[Validators.required]),
    
      "Password":new FormControl('',[Validators.required])
    })
  }
  loginProcess(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result=>{
        if(result.success){
          console.log(result);
          this.authService.setLoginStatus();
          this.loginSuccess=true;
          this.router.navigate(['/Designation']);
        }
      },
      error =>{
        //this.authService.setLoginStatus();
        //this.router.navigate(['/Designation']);
        //console.log(error);
        //alert(error.error.title);
      }
      )
    }
  }
  register(){
    this.router.navigate(['/Designation']);
  }
}