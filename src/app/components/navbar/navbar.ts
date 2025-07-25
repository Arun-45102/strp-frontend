import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, DecodedToken } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  user: DecodedToken | null = null;
  private router = inject(Router);

  private authService = inject(Auth);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
