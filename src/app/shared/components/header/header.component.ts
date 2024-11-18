import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';
import { BitacoraService } from '../../../core/services/bitacora.service';
import { Bitacora } from '../../../core/models/bitacora';
import { Notificacion } from '../../../core/models/notificacion';
import { NotificacionService } from '../../../core/services/notificacion.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private sidebarService: SidebarService,
    private bitacoraService: BitacoraService,
    private notificacionService: NotificacionService
  ) {}

  notificaciones: Notificacion[] = [];
  mostrarNotificaciones: boolean = false; // Controla la visibilidad del recuadro

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  cargarNotificaciones(): void {
    const correo = this.authService.getAuthenticatedUserEmail();
    if (correo) {
      this.notificacionService.obtenerNotificacionesPorCorreo(correo).subscribe({
        next: (data) => {
          this.notificaciones = data;
        },
        error: (err) => console.error('Error al cargar las notificaciones:', err),
      });
    }
  }

  marcarTodasComoLeidas(): void {
    this.notificacionService.marcarTodasComoLeidas().subscribe({
      next: () => {
        this.notificaciones.forEach((notificacion) => (notificacion.leido = true));
      },
      error: (err) => console.error('Error al marcar todas como leídas:', err),
    });
  }

  toggleNotificaciones(): void {
    this.mostrarNotificaciones = !this.mostrarNotificaciones;
  }

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
