import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Especialidad } from '../../core/models/especialidad';
import { Medico } from '../../core/models/medico';
import { MedicoEspecialidad } from '../../core/models/medicoEspecialidad';
import { EspecialidadService } from '../../core/services/especialidad.service';
import { MedicoService } from '../../core/services/medico.service';
import { MedicoEspecialidadService } from '../../core/services/medico-especialidad.service';
import { BitacoraService } from '../../core/services/bitacora.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { Bitacora } from '../../core/models/bitacora';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-medico-especialidad',
  standalone: true,
  templateUrl: './medico-especialidad.component.html',
  styleUrls: ['./medico-especialidad.component.css'],
  imports: [ToastModule, TableModule, CommonModule, FormsModule, ButtonModule, RippleModule, DropdownModule],
  providers: [MessageService],
})
export default class MedicoEspecialidadComponent {
  especialidadId: number = 0;
  especialidad: Especialidad | null = null;
  medicoEspecialidades: MedicoEspecialidad[] = [];
  medicosNoAsignados: Medico[] = [];
  selectedMedicoId: number | null = null;

  sortField: string = 'medico.id';
  sortOrder: number = 1;

  constructor(
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private bitacoraService: BitacoraService, // Inyecta el servicio de bitácora
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  buscarEspecialidad() {
    if (this.especialidadId > 0) {
      this.especialidadService.getEspecialidadById(this.especialidadId).subscribe(
        (especialidad) => {
          if (especialidad) {
            this.especialidad = especialidad;
            this.buscarMedicoEspecialidades();

            // Registro en bitácora
            this.registrarBitacora('Listar especialidades', `Listar especialidades de ${this.especialidad.nombre}`);
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ingrese un ID de especialidad válido' });
            this.especialidad = null;
            this.medicoEspecialidades = [];
            this.medicosNoAsignados = [];
          }
        },
        () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al buscar la especialidad' })
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ingrese un ID de especialidad válido' });
    }
  }

  buscarMedicoEspecialidades() {
    this.medicoEspecialidadService.getMedicoEspecialidades().subscribe(
      (data) => {
        this.medicoEspecialidades = data
          .filter((me) => me.especialidad!.id === this.especialidadId)
          .sort((a, b) => (a.medico!.id || 0) - (b.medico!.id || 0));
        this.buscarMedicosNoAsignados();
      },
      () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener médicos de la especialidad' })
    );
  }

  buscarMedicosNoAsignados() {
    this.medicoService.getMedicos().subscribe((allMedicos) => {
      const assignedMedicoIds = this.medicoEspecialidades.map((me) => me.medico!.id);
      this.medicosNoAsignados = allMedicos.filter((medico) => !assignedMedicoIds.includes(medico.id));
    });
  }

  assignMedico() {
    if (this.selectedMedicoId) {
      const newMedicoEspecialidad: MedicoEspecialidad = {
        especialidad: this.especialidad!,
        medico: { id: this.selectedMedicoId } as Medico,
      };

      this.medicoEspecialidadService.createMedicoEspecialidad(newMedicoEspecialidad).subscribe(
        () => {
          this.buscarMedicoEspecialidades();
          this.buscarMedicosNoAsignados();
          const medicoAsignado = this.medicosNoAsignados.find((medico) => medico.id === this.selectedMedicoId);
          this.selectedMedicoId = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Asignado',
            detail: 'Médico asignado correctamente',
          });

          // Registro en bitácora
          if (medicoAsignado) {
            this.registrarBitacora('Asignar especialidad', `Asignó ${this.especialidad?.nombre} a ${medicoAsignado.usuario!.nombre} ${medicoAsignado.usuario!.apellido}`);
          }
        },
        () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo asignar el médico' })
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Seleccione un médico para asignar' });
    }
  }

  deleteMedicoEspecialidad(id: number) {
    const medicoEspecialidadEliminada = this.medicoEspecialidades.find((me) => me.id === id);
    this.medicoEspecialidadService.deleteMedicoEspecialidad(id).subscribe(() => {
      this.medicoEspecialidades = this.medicoEspecialidades.filter((me) => me.id !== id);
      this.buscarMedicosNoAsignados();
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Médico de la especialidad eliminado correctamente',
      });

      // Registro en bitácora
      if (medicoEspecialidadEliminada) {
        this.registrarBitacora(
          'Eliminar especialidad',
          `Quitó ${medicoEspecialidadEliminada.especialidad?.nombre} a ${medicoEspecialidadEliminada.medico?.usuario!.nombre} ${medicoEspecialidadEliminada.medico?.usuario!.apellido}`
        );
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
