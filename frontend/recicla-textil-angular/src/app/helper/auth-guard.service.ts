import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../helper/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // verify loggin
    return this.authService.isLoggedIn().pipe(
      map((loggedIn) => {
        if (loggedIn) {
          // if authenticated
          const userType = localStorage.getItem('userType');
          const allowedUserTypes = route.data['allowedUserTypes'];
          if (allowedUserTypes && allowedUserTypes.includes(userType)) {
            // has access
            return true;
          } else {
            // no access
            this.router.navigate(['/access-denied']);
            return false;
          }
        } else {
          // not logged in
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      })
    );
  }
}
