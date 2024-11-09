import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Rol } from '../../core/models/rol';
import { RolService } from '../../core/services/rol.service';
import { Permiso } from '../../core/models/permiso';
import { PermisoService } from '../../core/services/permiso.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RolPermiso } from '../../core/models/rolPermiso';
import { RolPermisoService } from '../../core/services/rolPermiso.service';
import { DropdownModule } from 'primeng/dropdown';

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
  permisosNoAsignados: Permiso[] = []; // Lista de permisos no asignados al rol
  selectedPermisoId: number | null = null; // Permiso seleccionado para asignar

  // Definir el campo y orden de la tabla
  sortField: string = 'permiso.id';
  sortOrder: number = 1;

  constructor(
    private rolService: RolService,
    private permisoService: PermisoService,
    private rolPermisoService: RolPermisoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  buscarRol() {
    if (this.rolId > 0) { // Verificar que el ID sea mayor a 0
      this.rolService.getRolById(this.rolId).subscribe(
        (rol) => {
          if (rol) {
            // Si el rol existe, actualiza los datos del rol y busca sus permisos
            this.rol = rol;
            this.buscarRolPermisos();
          } else {
            // Si el rol es null, significa que no se encontró
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Rol no encontrado' });
            this.rol = null;
            this.rolPermisos = [];
            this.permisosNoAsignados = [];
          }
        },
        (error) => {
          // Manejo adicional para cualquier error inesperado
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al buscar el rol' });
        }
      );
    } else {
      // Mensaje de advertencia si el ID no es válido
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ingrese un ID de rol válido' });
    }
  }

  buscarRolPermisos() {
    this.rolPermisoService.getRolPermisos().subscribe(
      (data) => {
        // Filtrar y ordenar los permisos asociados al rol buscado
        this.rolPermisos = data
          .filter((rp) => rp.rol.id === this.rolId)
          .sort((a, b) => (a.permiso.id || 0) - (b.permiso.id || 0)); // Ordenar por ID de permiso
          
        this.buscarPermisosNoAsignados();
      },
      (error) => {
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
      const newRolPermiso: RolPermiso = {
        rol: this.rol!,
        permiso: { id: this.selectedPermisoId } as Permiso,
      };

      this.rolPermisoService.createRolPermiso(newRolPermiso).subscribe(
        () => {
          this.buscarRolPermisos(); // Recargar todos los permisos del rol para asegurar que se muestren correctamente
          this.buscarPermisosNoAsignados(); // Actualizar la lista de permisos no asignados
          this.selectedPermisoId = null; // Resetea el permiso seleccionado
          this.messageService.add({
            severity: 'success',
            summary: 'Asignado',
            detail: 'Permiso asignado correctamente',
          });
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
    this.rolPermisoService.deleteRolPermiso(id).subscribe(() => {
      this.rolPermisos = this.rolPermisos.filter((rp) => rp.id !== id);
      this.buscarPermisosNoAsignados(); // Actualiza la lista de permisos no asignados
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Permiso del rol eliminado correctamente',
      });
    });
  }
}
