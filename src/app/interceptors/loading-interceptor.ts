import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Loadingservice } from '../services/loadingservice';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(Loadingservice);
  loadingService.show();
  return next(req).pipe(finalize(() => loadingService.hide()));
};
