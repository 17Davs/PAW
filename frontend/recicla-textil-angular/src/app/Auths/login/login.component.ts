import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../helper/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        if (response && response.token) {
          this.router.navigate(['']);
        } else {
          this.snackBar.open('Login failed. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      },
      (error) => {
        this.snackBar.open('Login failed. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
