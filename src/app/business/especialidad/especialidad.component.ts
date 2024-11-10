import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Especialidad } from '../../core/models/especialidad';
import { EspecialidadService } from '../../core/services/especialidad.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [TableModule, CommonModule, ToastModule, FormsModule, ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule],
  providers: [MessageService],
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export default class EspecialidadComponent {
  especialidades: Especialidad[] = [];
  editedEspecialidades: { [key: number]: Especialidad } = {}; // Para almacenar especialidades en edición
  newEspecialidad: Especialidad = { nombre: '', descripcion: '' }; // Modelo para la nueva especialidad

  sortField: string = 'id';
  sortOrder: number = 1;

  constructor(
    private especialidadService: EspecialidadService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllEspecialidades();
  }

  getAllEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
    });
  }

  onRowEditInit(especialidad: Especialidad) {
    this.editedEspecialidades[especialidad.id!] = { ...especialidad };
    this.messageService.add({ severity: 'info', summary: 'Edición', detail: 'Editando especialidad' });
  }

  onRowEditSave(especialidad: Especialidad) {
    if (especialidad.nombre && especialidad.descripcion) {
      this.especialidadService.updateEspecialidad(especialidad).subscribe(() => {
        delete this.editedEspecialidades[especialidad.id!];
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Especialidad actualizada' });
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nombre y descripción son obligatorios' });
    }
  }

  onRowEditCancel(especialidad: Especialidad, rowIndex: number) {
    this.especialidades[rowIndex] = this.editedEspecialidades[especialidad.id!] || especialidad;
    delete this.editedEspecialidades[especialidad.id!];
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Edición cancelada' });
  }

  deleteEspecialidad(id: number) {
    this.especialidadService.deleteEspecialidad(id).subscribe(() => {
      this.especialidades = this.especialidades.filter(especialidad => especialidad.id !== id);
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Especialidad eliminada correctamente'
      });
    });
  }

  saveEspecialidad() {
    if (this.newEspecialidad.nombre && this.newEspecialidad.descripcion) {
      this.especialidadService.createEspecialidad(this.newEspecialidad).subscribe((especialidad) => {
        this.especialidades = [...this.especialidades, especialidad];
        this.cdr.detectChanges();
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Nueva especialidad creada correctamente'
        });
        this.newEspecialidad = { nombre: '', descripcion: '' };
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
