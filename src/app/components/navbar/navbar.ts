import { Component, inject, signal, effect } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Auth, DecodedToken } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  user = signal<DecodedToken | null>(null);
  private router = inject(Router);
  private authService = inject(Auth);

  constructor() {
    effect(() => {
      const user = this.authService.user();
      this.user.set(user);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
