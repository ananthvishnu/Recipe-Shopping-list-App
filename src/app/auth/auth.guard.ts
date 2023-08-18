import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}

//? Function to guard routes based on user authentication status
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean | UrlTree> | Observable<boolean| UrlTree>{
    return this.authService.user.pipe(
        take(1),
      map((user: any) => {
        const isAuth = !!user;//? Check if a user is authenticated
        if (isAuth){
            return true;//? Allow access to the route
        }
// ?Redirect to the authentication page if user is not authenticated
        return this.router.createUrlTree(['/auth'])
      }),
    //   tap(isAuth => {
    //     if(!isAuth) {
    //      this.router.navigate(['/auth'])
    //     }
    //   })
      
      );
  }
}
