import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
 constructor(private authService: AuthService) {}
 //? Intercept HTTP requests and attach authorization token if available
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1), //? Take the latest user snapshot
      exhaustMap((user: any) => {
        if (!user) {
          return next.handle(req);//? If no user, continue with the original request
        }
        //? Clone the request and add authorization token to its parameters
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);//? Continue with the modified request
      })
    );
  }
}
