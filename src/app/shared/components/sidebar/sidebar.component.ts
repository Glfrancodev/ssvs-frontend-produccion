import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngIf
import { SidebarService } from '../../../core/services/sidebar.service';
import { AuthService } from '../../../core/services/auth.service';
import { MedicoService } from '../../../core/services/medico.service';
import { Especialidad } from '../../../core/models/especialidad';


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

  constructor(private sidebarService: SidebarService, private authService: AuthService, private medicoService: MedicoService) {

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
}