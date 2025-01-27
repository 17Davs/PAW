import { Component } from '@angular/core';
import { AuthenticationService } from './helper/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Recicla Téxtil';
  constructor(private authService: AuthenticationService) {}

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
