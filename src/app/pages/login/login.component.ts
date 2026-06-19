import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card shadow">
        <div class="login-brand mb-4">
          <span class="login-icon">&#9634;</span>
          <h1 class="login-title">Veyra Inventory</h1>
          <p class="login-sub">Sign in to your account</p>
        </div>

        <div *ngIf="errorMsg" class="alert alert-danger py-2 small">{{ errorMsg }}</div>

        <form (ngSubmit)="login()">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input
              class="form-control"
              type="text"
              [(ngModel)]="username"
              name="username"
              autocomplete="username"
              placeholder="admin or viewer"
              required
            />
          </div>
          <div class="mb-4">
            <label class="form-label">Password</label>
            <input
              class="form-control"
              type="password"
              [(ngModel)]="password"
              name="password"
              autocomplete="current-password"
              placeholder="••••••••"
              required
            />
          </div>
          <button class="btn btn-primary w-100" type="submit" [disabled]="loading">
            <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f0f2f5;
    }
    .login-card {
      background: #fff;
      border-radius: 12px;
      padding: 2.5rem;
      width: 100%;
      max-width: 400px;
    }
    .login-brand { text-align: center; }
    .login-icon { font-size: 2rem; }
    .login-title { font-size: 1.5rem; font-weight: 700; margin: 0.25rem 0 0; }
    .login-sub { color: #6c757d; font-size: 0.9rem; margin: 0; }
  `]
})
export class LoginPage {
  username = '';
  password = '';
  loading = false;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    if (!this.username || !this.password) return;
    this.loading = true;
    this.errorMsg = '';

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Invalid username or password.';
      }
    });
  }
}
