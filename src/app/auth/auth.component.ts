import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;//? Whether the form is in login or signup mode
  isLoading = false;//? Loading state for form submission
  error: any = null;//? Placeholder for error messages

  constructor(private authService: AuthService, private router: Router) {}

 //? Switch between login and signup modes
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
//? Handle form submission
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;//? Exit if the form is not valid
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true; //? Show loading indicator

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);//? Call login service
    } else {
      authObs = this.authService.signup(email, password);//? Call signup service
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData);//? Log response data from authentication
        this.isLoading = false; //? Hide loading indicator
        this.router.navigate(['/recipes']);//? Navigate to the recipes page programmatically
      },
      (errorMessage) => {
        console.log(errorMessage); //? Log error messages
        this.error = errorMessage;//? Store error message to display in the template
        this.isLoading = false; //? Hide loading indicator
      }
    );

    form.reset();//? Reset the form after submission
  }
}
