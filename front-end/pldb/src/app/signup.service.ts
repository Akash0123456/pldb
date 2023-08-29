import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private _url = 'http://localhost:3000/users/signup';

  constructor(private http: HttpClient) { }

  signupUser(userData: any){
      return this.http.post<any>(this._url, userData);
  }


}
