import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ){}

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  })

  // Create a method to submit the form
  onSubmit(): void {
    console.log(this.loginForm.value);
    this.signupService.loginUser(this.loginForm.value)
        .subscribe({
          next: (data) => {
            console.log('Success');
            this.router.navigate(['/']);
          },
          error: (err) => console.error('Error', err)
        });
  }

}
