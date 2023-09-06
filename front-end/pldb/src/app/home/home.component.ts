import { Component } from '@angular/core';
import { SignupService } from '../signup.service';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    message = 'You are not logged in';
    
    constructor(private signupService: SignupService) { }

    ngOnInit(): void {
      this.signupService.checkAuth()
          .subscribe({
            next: (res) => {
              console.log(res);
              this.message = `Hi ${res.username}`;
              Emitters.authEmitter.emit(true);
            },
            error: (err) => {
              this.message = 'You are not logged in';
              Emitters.authEmitter.emit(false);
            }
          })
    }
}
