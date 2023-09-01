import { Component, Signal } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    authenticated = false;

    constructor(private signupService: SignupService) { }

    ngOnInit(): void {
      Emitters.authEmitter.subscribe(
        (auth: boolean) => {
          this.authenticated = auth;
        }
      )
    }

    logout(): void {
      this.signupService.logoutUser()
          .subscribe({
            next: (res) => {
              console.log(res);
              this.authenticated = false;
            },
            error: (err) => {
              console.log(err);
            }
          })
    } 
}
