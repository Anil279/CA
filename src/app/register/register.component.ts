import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup:any;
  constructor(private registerauthServiceService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
   this.initForm();
  }
  initForm(){
    this.formGroup=new FormGroup({
    UserName:new FormControl('',[Validators.required]),
    Email:new FormControl('',[Validators.required]),
    Password:new FormControl('',[Validators.required])
    })
  }
  registerProcess(){
      if(this.formGroup.valid){
        this.registerauthServiceService.register(this.formGroup.value).subscribe(result=>{
          if(result.message=="User created sucessfully"){
            console.log(result);
            this.router.navigate(['/login']);
          }else{
            alert(result.message);
          }
        },
        error =>{
            this.router.navigate(['/login']);
            console.log(error);
            alert(error.error.title);
          })
      }
    }
}
