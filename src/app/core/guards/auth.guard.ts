// src/app/core/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const allowedRoles = route.data?.['roles'] as Array<string>;
    const userRole = authService.getUserRole() || ''; // Proveer valor por defecto si es null

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  } else {
    return router.navigate(['/login']);
  }
};
