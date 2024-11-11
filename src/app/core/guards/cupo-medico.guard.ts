import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CupoMedicoGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasPermission = route.queryParams['fromAtencion'] === 'true' && 
                          (this.authService.getUserRole() === 'Medico' || 
                           this.authService.getUserRole() === 'SuperUsuario');

    if (!hasPermission) {
      this.router.navigate(['/dashboard']); // Redirige si no tiene acceso
    }

    return hasPermission;
  }
}
