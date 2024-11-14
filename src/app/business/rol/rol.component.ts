import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Rol } from '../../core/models/rol';
import { RolService } from '../../core/services/rol.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BitacoraService } from '../../core/services/bitacora.service';
import { AuthService } from '../../core/services/auth.service';
import { Bitacora } from '../../core/models/bitacora';

@Component({
  selector: 'app-permiso',
  standalone: true,
  imports: [TableModule, CommonModule, ToastModule, FormsModule, ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule],
  providers: [MessageService],
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export default class RolComponent {
  roles: Rol[] = [];
  editedRoles: { [key: number]: Rol } = {}; // Para almacenar permisos en edición
  newRol: Rol = { nombre: '' }; // Modelo para el nuevo rol

  sortField: string = 'id';
  sortOrder: number = 1;

  constructor(
    private rolService: RolService,
    private messageService: MessageService,
    private bitacoraService: BitacoraService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.rolService.getRoles().subscribe((data) => {
      this.roles = data;
    });
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

  
  onRowEditInit(rol: Rol) {
    this.editedRoles[rol.id!] = { ...rol };
    this.messageService.add({ severity: 'info', summary: 'Edición', detail: 'Editando rol' });
  }

  onRowEditSave(rol: Rol) {
    if (rol.nombre) {
      this.rolService.updateRol(rol).subscribe(() => {
        delete this.editedRoles[rol.id!];
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Rol actualizado' });
        // Registro en bitácora
        this.registrarBitacora('Actualizar Rol', `Rol actualizado: ${rol.nombre}`);
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nombre es obligatorio' });
    }
  }

  onRowEditCancel(rol: Rol, rowIndex: number) {
    this.roles[rowIndex] = this.editedRoles[rol.id!] || rol;
    delete this.editedRoles[rol.id!];
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Edición cancelada' });
  }

  deleteRol(id: number) {
    const rolEliminado = this.roles.find(rol => rol.id === id);
    this.rolService.deleteRol(id).subscribe(() => {
      this.roles = this.roles.filter(rol => rol.id !== id);
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Rol eliminado correctamente'
      });

      // Registro en bitácora
      this.registrarBitacora('Eliminar Rol', `Rol eliminado: ${rolEliminado?.nombre}`);

    });
  }

  saveRol() {
    if (this.newRol.nombre) {
      this.rolService.createRol(this.newRol).subscribe((rol) => {
        this.roles = [...this.roles, rol]; // Crea una nueva referencia para el array roles
        this.cdr.detectChanges(); // Forza la detección de cambios
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Nuevo rol creado correctamente'
        });
        // Registro en bitácora
        this.registrarBitacora('Añadir Rol', `Rol añadido: ${rol.nombre}`);
        this.newRol = { nombre: '' }; // Resetea el formulario
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Nombre es obligatorio'
      });
    }
  }
}
