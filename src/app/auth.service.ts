import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loginSuccess= false;
  constructor(private http:HttpClient) { }
  login(data:any):Observable<any>{
    console.log("I am server");   
    this.loginSuccess=false
    return this.http.get('https://localhost:7278/api/Employee/Authentication'+`/${data.Email}/${data.Password}`);
  }

  register(data:any):Observable<any>{
    return this.http.post('http://localhost:44196/api/Authentication/Register',data);
  }

  getLoginStatus(){
    return this.loginSuccess;
  }

  setLoginStatus(){
    this.loginSuccess=true;
  }

}
