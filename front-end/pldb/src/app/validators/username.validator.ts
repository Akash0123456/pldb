import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(forbiddenNames?: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbiddenUsernames = ['admin', 'spam', 'user', 'password']; // Array of forbidden usernames
    if (forbiddenNames != undefined){
      forbiddenNames.forEach((forbiddenName) =>{
        forbiddenUsernames.push(forbiddenName);
      })
    }
    const username = control.value;
  
    if (forbiddenUsernames.includes(username)) {
      return { forbiddenName: { value: username, forbiddenUsername: username } }; // Return an error if username is forbidden
    }
  
    return null; // Username is not forbidden
  }
}
