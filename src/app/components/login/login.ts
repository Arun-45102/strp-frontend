import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Auth, DecodedToken } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorMessage = signal<string | null>(null);
  private backendUrl = environment.apiUrl;
  user = signal<DecodedToken | null>(null);
  guildData = signal<any>(null);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(Auth);

  constructor() {
    // Effect for query params
    effect(() => {
      this.route.queryParams.subscribe((params) => {
        if (params['error']) {
          this.errorMessage.set(`${params['error']}`);
        }
        if (params['token']) {
          this.authService.setAuthToken(params['token']);
          this.router.navigate(['/home']);
        }
      });
    });
    // Effect for user state
    effect(() => {
      const user = this.authService.user();
      this.user.set(user);
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

  loginWithDiscord() {
    window.location.href = `${this.backendUrl}/auth/discord`;
  }
}
