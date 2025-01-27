import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../helper/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
