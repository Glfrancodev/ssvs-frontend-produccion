import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngIf
import { SidebarService } from '../../../core/services/sidebar.service';

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

  ngOnInit(): void {
    // Al inicializar, configuramos el sidebar según el tamaño de la pantalla
    this.checkScreenSize();
  }

  constructor(private sidebarService: SidebarService) {
    // Suscribirse a los cambios en el estado del sidebar
    this.sidebarService.sidebarOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
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
    this.expandedMenus[menu] = !this.expandedMenus[menu];
  }
}