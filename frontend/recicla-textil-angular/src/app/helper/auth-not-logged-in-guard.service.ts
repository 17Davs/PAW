import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../helper/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthNotLoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
