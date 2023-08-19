import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true; //? Whether the form is in login or signup mode
  isLoading = false; //? Loading state for form submission
  error: any = null; //? Placeholder for error messages
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;

  private closeSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  //? Switch between login and signup modes
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  //? Handle form submission
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return; //? Exit if the form is not valid
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true; //? Show loading indicator

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password); //? Call login service
    } else {
      authObs = this.authService.signup(email, password); //? Call signup service
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData); //? Log response data from authentication
        this.isLoading = false; //? Hide loading indicator
        this.router.navigate(['/recipes']); //? Navigate to the recipes page programmatically
      },
      (errorMessage) => {
        console.log(errorMessage); //? Log error messages
        this.error = errorMessage; //? Store error message to display in the template
        this.showErrorAlert(errorMessage);
        this.isLoading = false; //? Hide loading indicator
      }
    );

    form.reset(); //? Reset the form after submission
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  //Dynamically create a component by code
  private showErrorAlert(message: string) {
    //const alertCmp = new AlertComponent()
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
