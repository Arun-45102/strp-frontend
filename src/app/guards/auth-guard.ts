import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    return true;
  } else {
    console.log('AuthGuard: No token found, redirecting to login.');
    return router.createUrlTree(['/login']);
  }
};
