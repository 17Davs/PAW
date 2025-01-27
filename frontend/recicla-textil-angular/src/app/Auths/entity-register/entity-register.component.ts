import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../helper/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-entity-register',
  templateUrl: './entity-register.component.html',
  styleUrls: ['./entity-register.component.css'],
})
export class EntityRegisterComponent {
  name!: string;
  email!: string;
  password!: string;
  description!: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register(): void {
    this.authService
      .registerEntity(this.name, this.email, this.password, this.description)
      .subscribe(
        (response) => {
          this.snackBar.open('Registration successful', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/home']);
        },
        (error) => {
          this.snackBar.open(
            'Registration failed. Please try again.',
            'Close',
            {
              duration: 3000,
            }
          );
        }
      );
  }
}
