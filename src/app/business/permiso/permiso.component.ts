import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Permiso } from '../../core/models/permiso';
import { PermisoService } from '../../core/services/permiso.service';
import { BitacoraService } from '../../core/services/bitacora.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Bitacora } from '../../core/models/bitacora';

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
  editedPermisos: { [key: number]: Permiso } = {};
  newPermiso: Permiso = { nombre: '', descripcion: '' };

  sortField: string = 'id';
  sortOrder: number = 1;

  constructor(
    private permisoService: PermisoService,
    private messageService: MessageService,
    private bitacoraService: BitacoraService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllPermisos();
  }

  getAllPermisos() {
    this.permisoService.getPermisos().subscribe((data) => {
      this.permisos = data;
    });
  }

  registrarBitacora(accion: string, detalle: string): void {
    const now = new Date();
    const fecha = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const hora = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const bitacoraEntry: Bitacora = {
      correo: this.authService.getAuthenticatedUserEmail() || '',
      fecha: fecha,
      hora: hora,
      ip: 'IP_DEL_USUARIO', // Puedes obtener la IP si ya tienes el servicio configurado para obtenerla
      accion: accion,
      detalle: detalle
    };

    this.bitacoraService.createBitacora(bitacoraEntry).subscribe({
      next: () => console.log('Registro de bitácora exitoso'),
      error: (err) => console.error('Error al registrar en bitácora', err)
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
        
        // Registro en bitácora
        this.registrarBitacora('Editar Permiso', `Permiso actualizado: ${permiso.nombre}`);
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
    const permisoEliminado = this.permisos.find(permiso => permiso.id === id);

    this.permisoService.deletePermiso(id).subscribe(() => {
      this.permisos = this.permisos.filter(permiso => permiso.id !== id);
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Permiso eliminado correctamente'
      });
      
      // Registro en bitácora
      this.registrarBitacora('Eliminar Permiso', `Permiso eliminado: ${permisoEliminado?.nombre}`);
    });
  }

  savePermiso() {
    if (this.newPermiso.nombre && this.newPermiso.descripcion) {
      this.permisoService.createPermiso(this.newPermiso).subscribe((permiso) => {
        this.permisos = [...this.permisos, permiso]; // Actualiza el array
        this.cdr.detectChanges(); // Forza la detección de cambios
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Nuevo permiso creado correctamente'
        });
        
        // Registro en bitácora
        this.registrarBitacora('Añadir Permiso', `Permiso añadido: ${permiso.nombre}`);
        
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
