import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorMessage: string | null = null;
  private backendUrl = environment.apiUrl;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['error']) {
        this.errorMessage = `Login failed: ${params['error']}. Please try again.`;
      }
      if (params['token']) {
        localStorage.setItem('authToken', params['token']);
        this.router.navigate(['/home']);
      }
    });
  }

  loginWithDiscord() {
    window.location.href = `${this.backendUrl}/auth/discord`;
  }
}
