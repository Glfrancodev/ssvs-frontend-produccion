import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Rol } from '../../core/models/rol';
import { RolService } from '../../core/services/rol.service';
import { Permiso } from '../../core/models/permiso';
import { PermisoService } from '../../core/services/permiso.service';
import { RolPermiso } from '../../core/models/rolPermiso';
import { RolPermisoService } from '../../core/services/rolPermiso.service';
import { BitacoraService } from '../../core/services/bitacora.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { Bitacora } from '../../core/models/bitacora';

@Component({
  selector: 'app-rol-permiso',
  standalone: true,
  templateUrl: './rol-permiso.component.html',
  styleUrls: ['./rol-permiso.component.css'],
  imports: [ToastModule, TableModule, CommonModule, FormsModule, ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule, DropdownModule],
  providers: [MessageService],
})
export default class RolPermisoComponent {
  rolId: number = 0;
  rol: Rol | null = null;
  rolPermisos: RolPermiso[] = [];
  permisosNoAsignados: Permiso[] = [];
  selectedPermisoId: number | null = null;

  sortField: string = 'permiso.id';
  sortOrder: number = 1;

  constructor(
    private rolService: RolService,
    private permisoService: PermisoService,
    private rolPermisoService: RolPermisoService,
    private bitacoraService: BitacoraService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

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

  buscarRol() {
    if (this.rolId > 0) {
      this.rolService.getRolById(this.rolId).subscribe(
        (rol) => {
          if (rol) {
            this.rol = rol;
            this.buscarRolPermisos();
            // Registro en bitácora
            this.registrarBitacora('Listar Permisos', `Listar permisos de ${rol.nombre}`);
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ingrese un ID de rol válido' });
            this.rol = null;
            this.rolPermisos = [];
            this.permisosNoAsignados = [];
          }
        },
        () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al buscar el rol' });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ingrese un ID de rol válido' });
    }
  }

  buscarRolPermisos() {
    this.rolPermisoService.getRolPermisos().subscribe(
      (data) => {
        this.rolPermisos = data
          .filter((rp) => rp.rol.id === this.rolId)
          .sort((a, b) => (a.permiso.id || 0) - (b.permiso.id || 0));
          
        this.buscarPermisosNoAsignados();
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener permisos del rol' });
      }
    );
  }

  buscarPermisosNoAsignados() {
    this.permisoService.getPermisos().subscribe((allPermisos) => {
      const assignedPermisoIds = this.rolPermisos.map((rp) => rp.permiso.id);
      this.permisosNoAsignados = allPermisos.filter((permiso) => !assignedPermisoIds.includes(permiso.id));
    });
  }

  assignPermiso() {
    if (this.selectedPermisoId) {
      const selectedPermiso = this.permisosNoAsignados.find(p => p.id === this.selectedPermisoId);
      const newRolPermiso: RolPermiso = {
        rol: this.rol!,
        permiso: { id: this.selectedPermisoId } as Permiso,
      };

      this.rolPermisoService.createRolPermiso(newRolPermiso).subscribe(
        () => {
          this.buscarRolPermisos();
          this.buscarPermisosNoAsignados();
          this.messageService.add({
            severity: 'success',
            summary: 'Asignado',
            detail: 'Permiso asignado correctamente',
          });
          // Registro en bitácora
          this.registrarBitacora('Asignar Permiso', `Asignó ${selectedPermiso?.nombre} a ${this.rol?.nombre}`);
          this.selectedPermisoId = null;
        },
        () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo asignar el permiso' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Seleccione un permiso para asignar' });
    }
  }

  deleteRolPermiso(id: number) {
    const rolPermisoEliminado = this.rolPermisos.find(rp => rp.id === id);

    this.rolPermisoService.deleteRolPermiso(id).subscribe(() => {
      this.rolPermisos = this.rolPermisos.filter((rp) => rp.id !== id);
      this.buscarPermisosNoAsignados();
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Permiso del rol eliminado correctamente',
      });
      // Registro en bitácora
      this.registrarBitacora('Eliminar Permiso', `Quitó ${rolPermisoEliminado?.permiso.nombre} de ${this.rol?.nombre}`);
    });
  }
}
