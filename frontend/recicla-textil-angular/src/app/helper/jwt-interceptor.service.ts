import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // get the current user from localStorage
    const currentUserStr = localStorage.getItem('currentUser');
    // parse the user if it is not null
    // let currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
    // if a current user exists and has a token, clone the request and add the header
    //if (currentUser && currentUser.token) {
    request = request.clone({
      setHeaders: {
        'x-access-token': `${currentUserStr}`,
      },
    });
    // }

    return next.handle(request);
  }
}
