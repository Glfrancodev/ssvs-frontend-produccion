import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngIf
import { SidebarService } from '../../../core/services/sidebar.service';
import { AuthService } from '../../../core/services/auth.service';
import { MedicoService } from '../../../core/services/medico.service';
import { Especialidad } from '../../../core/models/especialidad';
import { BitacoraService } from '../../../core/services/bitacora.service'; // Importa el servicio de bitácora
import { Bitacora } from '../../../core/models/bitacora';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen = true;
  expandedMenus: { [key: string]: boolean } = {
    gestionUsuario: false,
  };

  userRole: string | null = null;
  especialidades: Especialidad[] = [];

  constructor(private sidebarService: SidebarService, private authService: AuthService, private medicoService: MedicoService, private bitacoraService: BitacoraService) {
    // Suscribirse a los cambios en el estado del sidebar
    this.sidebarService.sidebarOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
    
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.userRole = this.authService.getUserRole();
    
    const correoMedico = this.authService.getAuthenticatedUserEmail();
    
    if (correoMedico) {
      this.medicoService.getEspecialidadesDelMedico(correoMedico).subscribe((data) => {
        this.especialidades = data;
      });
    } else {
      console.error("El correo del médico autenticado es nulo");
    }
  }
  

  @HostListener('window:resize', [])
  checkScreenSize() {
    if (window.innerWidth >= 1280) {
      this.isSidebarOpen = true;
    } else {
      this.isSidebarOpen = false;
    }
  }

  toggleMenu(menu: string) {
    if (this.expandedMenus[menu]) {
      this.expandedMenus[menu] = false;
    } else {
      Object.keys(this.expandedMenus).forEach((key) => {
        this.expandedMenus[key] = false;
      });
      this.expandedMenus[menu] = true;
    }
  }

  // Método para registrar en la bitácora
  registrarBitacora(accion: string, detalle: string): void {
    this.bitacoraService.getUserIP().subscribe({
      next: (response) => {
        const now = new Date();
        const fecha = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const hora = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        const bitacoraEntry: Bitacora = {
          correo: this.authService.getAuthenticatedUserEmail() || '',
          fecha: fecha,
          hora: hora,
          ip: response.ip,
          accion: accion,
          detalle: detalle
        };

        this.bitacoraService.createBitacora(bitacoraEntry).subscribe({
          next: () => console.log('Registro de bitácora exitoso'),
          error: (err) => console.error('Error al registrar en bitácora', err)
        });
      },
      error: (err) => console.error('Error al obtener IP', err)
    });
  }

  // Llamada desde el botón de usuario para registrar "Listar usuarios"
  listarUsuarios(): void {
    this.registrarBitacora('Listar usuarios', 'El usuario accedió a la lista de usuarios');
  }

}