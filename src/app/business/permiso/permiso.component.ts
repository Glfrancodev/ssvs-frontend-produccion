import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Permiso } from '../../core/models/permiso';
import { PermisoService } from '../../core/services/permiso.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel

@Component({
  selector: 'app-permiso',
  standalone: true,
  imports: [TableModule, CommonModule, ToastModule, FormsModule],
  providers: [MessageService],
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.css']
})
export default class PermisoComponent {
  permisos: Permiso[] = [];
  editedPermisos: { [key: number]: Permiso } = {}; // Para almacenar permisos en edición

  constructor(private permisoService: PermisoService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getAllPermisos();
  }

  getAllPermisos() {
    this.permisoService.getPermisos().subscribe((data) => {
      this.permisos = data;
    });
  }

  onRowEditInit(permiso: Permiso) {
    this.editedPermisos[permiso.id!] = { ...permiso };
    this.messageService.add({ severity: 'info', summary: 'Edición', detail: 'Editando permiso' });
  }

  onRowEditSave(permiso: Permiso) {
    if (permiso.nombre && permiso.descripcion) {
      this.permisoService.updatePermiso(permiso).subscribe(() => {
        delete this.editedPermisos[permiso.id!];
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Permiso actualizado' });
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nombre y descripción son obligatorios' });
    }
  }

  onRowEditCancel(permiso: Permiso, rowIndex: number) {
    this.permisos[rowIndex] = this.editedPermisos[permiso.id!] || permiso;
    delete this.editedPermisos[permiso.id!];
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Edición cancelada' });
  }
}
