import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../helper/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-donor-register',
  templateUrl: './donor-register.component.html',
  styleUrls: ['./donor-register.component.css'],
})
export class DonorRegisterComponent {
  name!: string;
  email!: string;
  pass!: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register(): void {
    this.authService.registerDonor(this.name, this.email, this.pass).subscribe(
      (response) => {
        this.snackBar.open('Registration successful', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Registration error:', error); // Logando o erro no console
        this.snackBar.open(
          `Registration failed: ${error.error?.message || 'Please try again.'}`,
          'Close',
          { duration: 3000 }
        );
      }
    );
  }
}
