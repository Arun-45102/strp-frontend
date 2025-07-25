import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(Auth);

  // const authToken = localStorage.getItem('authToken');

  if (authService.isAuthenticated()) {
    return true;
  } else {
    console.log('AuthGuard: No token found, redirecting to login.');
    return router.createUrlTree(['/login']);
  }
};
