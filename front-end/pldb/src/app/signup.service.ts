import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private hostUri = 'http://localhost:3000/'

  private signupUrl = this.hostUri + 'users/signup';
  private loginUrl = this.hostUri + 'users/login';
  private getLoginCredentialsUrl = this.hostUri +'users/checkAuth';
  private logoutUrl = this.hostUri + 'users/logout';

  constructor(private http: HttpClient) { }

  signupUser(userData: any){
      return this.http.post<any>(this.signupUrl, userData);
  }

  loginUser(userData: any){
    return this.http.post<any>(this.loginUrl, userData, {withCredentials: true});
  }

  checkAuth(){
    return this.http.get<any>(this.getLoginCredentialsUrl, {withCredentials: true})
  }

  logoutUser(){
    return this.http.post<any>(this.logoutUrl, {});
  }

}
