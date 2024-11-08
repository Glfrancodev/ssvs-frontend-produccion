import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngIf

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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Alterna entre visible e invisible
  }

  toggleMenu(menu: string) {
    this.expandedMenus[menu] = !this.expandedMenus[menu];
  }
}