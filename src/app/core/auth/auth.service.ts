import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

const TOKEN_KEY = 'veyra_token';
const USER_KEY = 'veyra_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(TOKEN_KEY, res.token);
          localStorage.setItem(USER_KEY, JSON.stringify({ username: res.username, role: res.role }));
        }
      })
    );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUsername(): string {
    if (typeof localStorage === 'undefined') return '';
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user).username : '';
  }

  getRole(): string {
    if (typeof localStorage === 'undefined') return '';
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user).role : '';
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }
}
