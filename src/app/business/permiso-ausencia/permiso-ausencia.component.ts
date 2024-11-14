import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PermisoAusencia } from '../../core/models/permisoAusencia';
import { Medico } from '../../core/models/medico';
import { PermisoAusenciaService } from '../../core/services/permiso-ausencia.service';
import { MedicoService } from '../../core/services/medico.service';
import { BitacoraService } from '../../core/services/bitacora.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from '../../core/services/auth.service';
import { Bitacora } from '../../core/models/bitacora';

@Component({
  selector: 'app-permiso-ausencia',
  standalone: true,
  templateUrl: './permiso-ausencia.component.html',
  styleUrls: ['./permiso-ausencia.component.css'],
  imports: [
    ToastModule, TableModule, CommonModule, FormsModule, ButtonModule,
    RippleModule, InputGroupAddonModule, InputGroupModule, DropdownModule,
    CalendarModule
  ],
  providers: [MessageService],
})
export default class PermisoAusenciaComponent {
  permisosAusencia: PermisoAusencia[] = [];
  medicos: Medico[] = [];
  estadoOptions = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'Aprobado', value: 'Aprobado' },
    { label: 'Denegado', value: 'Denegado' }
  ];
  editedPermisosAusencia: { [key: number]: PermisoAusencia } = {};

  newPermisoAusencia: PermisoAusencia = {
    fechaPermiso: '',
    descripcion: '',
    estado: 'Pendiente',
    medico: { id: 0, item: '', usuario: { ci: '', correo: '', contrasena: '', nombre: '', apellido: '', estaActivo: true } }
  };

  constructor(
    private permisoAusenciaService: PermisoAusenciaService,
    private medicoService: MedicoService,
    private messageService: MessageService,
    private bitacoraService: BitacoraService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllPermisosAusencia();
    this.getAllMedicos();
  }

  getAllPermisosAusencia() {
    this.permisoAusenciaService.getPermisosAusencia().subscribe((data) => {
      this.permisosAusencia = data;
      this.sortPermisosAusencia();
    });
  }

  getAllMedicos() {
    this.medicoService.getMedicos().subscribe((data) => {
      this.medicos = data;
    });
  }

  sortPermisosAusencia() {
    this.permisosAusencia.sort((a, b) => (a.id || 0) - (b.id || 0));
  }

  addPermisoAusencia() {
    if (!this.newPermisoAusencia.fechaPermiso || !this.newPermisoAusencia.descripcion) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos Incompletos',
        detail: 'Por favor, complete todos los campos requeridos'
      });
      return;
    }
  
    this.permisoAusenciaService.createPermisoAusencia(this.newPermisoAusencia).subscribe((permiso) => {
      // Llama al backend para obtener el permiso completo con los datos del médico
      this.permisoAusenciaService.getPermisoAusenciaById(permiso.id!).subscribe((permisoCompleto) => {
        this.getAllPermisosAusencia();
        this.messageService.add({
          severity: 'success',
          summary: 'Permiso de Ausencia Agregado',
          detail: 'Nuevo permiso de ausencia creado correctamente',
        });
  
        // Registro en bitácora con el nombre completo del médico
        const medicoLabel = `${permisoCompleto.medico?.usuario?.nombre} ${permisoCompleto.medico?.usuario?.apellido}`;
        this.registrarBitacora('Añadir Permiso Ausencia', `Añadir Permiso Ausencia para el (${permisoCompleto.fechaPermiso}) de (${medicoLabel})`);
  
        // Reiniciar el formulario después de agregar
        this.newPermisoAusencia = {
          fechaPermiso: '',
          descripcion: '',
          estado: 'Pendiente',
          medico: { id: 0, item: '', usuario: { ci: '', correo: '', contrasena: '', nombre: '', apellido: '', estaActivo: true } }
        };
      });
    });
  }
  

  onRowEditInit(permiso: PermisoAusencia) {
    this.editedPermisosAusencia[permiso.id!] = { ...permiso };
  }

  onRowEditSave(permiso: PermisoAusencia) {
    this.permisoAusenciaService.updatePermisoAusencia(permiso).subscribe(() => {
      delete this.editedPermisosAusencia[permiso.id!];
      this.messageService.add({
        severity: 'success',
        summary: 'Estado Actualizado',
        detail: 'El estado del permiso ha sido actualizado correctamente'
      });
      this.getAllPermisosAusencia();
      // Registro en bitácora
      const medicoLabel = `${permiso.medico?.usuario?.nombre || 'Desconocido'} ${permiso.medico?.usuario?.apellido || 'Desconocido'}`;
      this.registrarBitacora('Modificar Permiso Ausencia', `Permiso para el ${permiso.fechaPermiso} de ${medicoLabel} fue ${permiso.estado}`);
    });
  }

  onRowEditCancel(permiso: PermisoAusencia, rowIndex: number) {
    this.permisosAusencia[rowIndex] = this.editedPermisosAusencia[permiso.id!] || permiso;
    delete this.editedPermisosAusencia[permiso.id!];
  }

  deletePermisoAusencia(id: number) {
    const permisoEliminado = this.permisosAusencia.find((permiso) => permiso.id === id);
    this.permisoAusenciaService.deletePermisoAusencia(id).subscribe(() => {
      this.permisosAusencia = this.permisosAusencia.filter(permiso => permiso.id !== id);
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Permiso de ausencia eliminado correctamente'
      });
      // Registro en bitácora
      if (permisoEliminado) {
        const medicoLabel = `${permisoEliminado.medico?.usuario?.nombre || 'Desconocido'} ${permisoEliminado.medico?.usuario?.apellido || 'Desconocido'}`;
        this.registrarBitacora('Eliminar Permiso Ausencia', `Permiso para el ${permisoEliminado.fechaPermiso} de ${medicoLabel} eliminada`);
      }
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
}
