import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Auth, DecodedToken } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorMessage: string | null = null;
  private backendUrl = environment.apiUrl;
  user: DecodedToken | null = null;
  guildData: any;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(Auth);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['error']) {
        this.errorMessage = `${params['error']}`;
      }
      if (params['token']) {
        this.authService.setAuthToken(params['token']);
        this.router.navigate(['/home']);
      }
    });
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    if (this.user) {
      this.router.navigate(['/home']);
    }
  }

  loginWithDiscord() {
    window.location.href = `${this.backendUrl}/auth/discord`;
  }
}
