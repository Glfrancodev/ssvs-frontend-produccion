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
        const fecha = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const hora = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

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
