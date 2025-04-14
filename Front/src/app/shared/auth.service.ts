import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>('http://localhost:8010/api/login', { login: username, password })
      .pipe(
        map(res => {
          localStorage.setItem('user', res.role);
          return true;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getUserRole(): string | null {
    return localStorage.getItem('user');
  }

  isLoggedIn(): boolean {
    return this.getUserRole() !== null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}
