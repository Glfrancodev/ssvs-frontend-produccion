import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Permiso } from '../../core/models/permiso';
import { PermisoService } from '../../core/services/permiso.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-permiso',
  standalone: true,
  imports: [TableModule, CommonModule, ToastModule, FormsModule, ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule],
  providers: [MessageService],
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.css']
})
export default class PermisoComponent {
  permisos: Permiso[] = [];
  editedPermisos: { [key: number]: Permiso } = {}; // Para almacenar permisos en edición
  newPermiso: Permiso = { nombre: '', descripcion: '' }; // Modelo para el nuevo permiso

  // Añade las propiedades de ordenamiento
  sortField: string = 'id';
  sortOrder: number = 1;

  constructor(
    private permisoService: PermisoService,
    private messageService: MessageService
  ) {}

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

  deletePermiso(id: number) {
    this.permisoService.deletePermiso(id).subscribe(() => {
      this.permisos = this.permisos.filter(permiso => permiso.id !== id);
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Permiso eliminado correctamente'
      });
    });
  }

  savePermiso() {
    if (this.newPermiso.nombre && this.newPermiso.descripcion) {
      this.permisoService.createPermiso(this.newPermiso).subscribe((permiso) => {
        this.permisos.push(permiso);
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Nuevo permiso creado correctamente'
        });
        this.newPermiso = { nombre: '', descripcion: '' }; // Resetea el formulario
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Nombre y descripción son obligatorios'
      });
    }
  }
}
