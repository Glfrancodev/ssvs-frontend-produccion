import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';
import { BitacoraService } from '../../../core/services/bitacora.service';
import { Bitacora } from '../../../core/models/bitacora';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private sidebarService: SidebarService,
    private bitacoraService: BitacoraService
  ) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout(): void {
    this.bitacoraService.getUserIP().subscribe({
      next: (response) => {
        const now = new Date();
        const fecha = now.toISOString().split('T')[0]; // Fecha en formato "YYYY-MM-DD"
        const hora = now.toTimeString().split(' ')[0]; // Hora en formato "HH:MM:SS"

        const bitacoraEntry: Bitacora = {
          correo: this.authService.getAuthenticatedUserEmail() || '', // Asume que tienes este método para obtener el correo del usuario autenticado
          fecha: fecha,
          hora: hora,
          ip: response.ip,
          accion: 'Cierre de sesión',
          detalle: 'El usuario cerró sesión en la plataforma'
        };

        this.bitacoraService.createBitacora(bitacoraEntry).subscribe({
          next: () => console.log('Bitácora de cierre de sesión registrada con éxito'),
          error: (err) => console.error('Error al registrar en la bitácora', err)
        });

        // Procede a cerrar sesión y redirigir al usuario
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Error al obtener IP', err)
    });
  }
}
