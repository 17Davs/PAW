import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiUrl}/login/donator`,
        JSON.stringify({ email, password }),
        httpOptions
      )
      .pipe(
        catchError(() => {
          // If donor login fails, try entity login
          return this.http.post<any>(
            `${this.apiUrl}/login/entity`,
            JSON.stringify({ email, password }),
            httpOptions
          );
        }),
        map((response) => {
          // Store token and user type in localStorage
          localStorage.setItem('currentUser', response.token);
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('userId', response.userId);
          return response;
        })
      );
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
  }

  registerDonor(name: string, email: string, pass: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiUrl}/register/donator`,
        { name, email, pass },
        httpOptions
      )
      .pipe(
        map((response) => {
          // Store token and user type in localStorage
          localStorage.setItem('currentUser', response.token);
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('userId', response.userId);
          return response;
        })
      );
  }

  registerEntity(
    name: string,
    email: string,
    pass: string,
    description: string
  ): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiUrl}/register/entity`,
        { name, email, pass, description },
        httpOptions
      )
      .pipe(
        map((response) => {
          // Store token and user type in localStorage
          localStorage.setItem('currentUser', response.token);
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('userId', response.userId);
          return response;
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    const currentUser = localStorage.getItem('currentUser');
    const isLoggedIn = currentUser !== null;
    return of(isLoggedIn);
  }

  getUserType(email: string): Observable<string> {
    const userType = localStorage.getItem('userType');
    if (userType !== null) {
      return of(userType);
    } else {
      // if 'userType' not defined, throw error
      return throwError('User type not found in localStorage');
    }
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http
      .get<any>(`${this.apiUrl}/check-email/${email}`, httpOptions)
      .pipe(
        map((response) => response.exists),
        catchError(() => {
          return of(false);
        })
      );
  }

  loggedIn() {
    return localStorage.getItem('currentUser') != null;
  }

  isDonor() {
    return localStorage.getItem('userType') === 'donor';
  }
}
