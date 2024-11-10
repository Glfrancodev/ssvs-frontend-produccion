import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PermisoAusencia } from '../../core/models/permisoAusencia';
import { Medico } from '../../core/models/medico';
import { PermisoAusenciaService } from '../../core/services/permiso-ausencia.service';
import { MedicoService } from '../../core/services/medico.service';
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
    // Validación de campos requeridos
    if (!this.newPermisoAusencia.fechaPermiso || 
        !this.newPermisoAusencia.descripcion ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos Incompletos',
        detail: 'Por favor, complete todos los campos requeridos'
      });
      return;
    }
  
    // Si todos los campos están completos, procede a agregar el permiso
    this.permisoAusenciaService.createPermisoAusencia(this.newPermisoAusencia).subscribe((permiso) => {
      this.getAllPermisosAusencia();
      this.messageService.add({
        severity: 'success',
        summary: 'Permiso de Ausencia Agregado',
        detail: 'Nuevo permiso de ausencia creado correctamente',
      });
      // Reiniciar el formulario después de agregar
      this.newPermisoAusencia = {
        fechaPermiso: '',
        descripcion: '',
        estado: 'Pendiente',
        medico: { id: 0, item: '', usuario: { ci: '', correo: '', contrasena: '', nombre: '', apellido: '', estaActivo: true } }
      };
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
    });
  }

  onRowEditCancel(permiso: PermisoAusencia, rowIndex: number) {
    this.permisosAusencia[rowIndex] = this.editedPermisosAusencia[permiso.id!] || permiso;
    delete this.editedPermisosAusencia[permiso.id!];
  }

  deletePermisoAusencia(id: number) {
    this.permisoAusenciaService.deletePermisoAusencia(id).subscribe(() => {
      this.permisosAusencia = this.permisosAusencia.filter(permiso => permiso.id !== id);
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Permiso de ausencia eliminado correctamente'
      });
    });
  }

}
