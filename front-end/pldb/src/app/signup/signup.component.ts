import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { forbiddenNameValidator } from '../validators/username.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  // Inject the FormBuilder class to utilize the service
  constructor(private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router){}

  // Create a form using the service
  registrationForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), forbiddenNameValidator([])]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  // Create a method to submit the form
  onSubmit(): void{
    console.log(this.registrationForm.value);
    this.signupService.signupUser(this.registrationForm.value)
        .subscribe({
          next: (data) => {
            console.log('Success');
            this.router.navigate(['/login']);
          },
          error: (err) => console.error('Error', err)
        })
  }
}
