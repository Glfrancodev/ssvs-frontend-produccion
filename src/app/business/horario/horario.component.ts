import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Horario } from '../../core/models/horario';
import { MedicoEspecialidad } from '../../core/models/medicoEspecialidad';
import { HorarioService } from '../../core/services/horario.service';
import { MedicoEspecialidadService } from '../../core/services/medico-especialidad.service';
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
import { Bitacora } from '../../core/models/bitacora';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-horario',
  standalone: true,
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
  imports: [
    ToastModule, TableModule, CommonModule, FormsModule, ButtonModule,
    RippleModule, InputGroupAddonModule, InputGroupModule, DropdownModule,
    CalendarModule
  ],
  providers: [MessageService],
})
export default class HorarioComponent {
  horarios: Horario[] = [];
  medicoEspecialidades: MedicoEspecialidad[] = [];
  editedHorarios: { [key: number]: Horario } = {};

  newHorario: Horario = {
    fecha: '',
    horaInicio: '',
    horaFinal: '',
    cantidadCupos: 0,
    medicoEspecialidad: { id: 0 }
  };

  constructor(
    private horarioService: HorarioService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private bitacoraService: BitacoraService, // Inyecta el servicio de bitácora
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllHorarios();
    this.getAllMedicoEspecialidades();
  }

  getAllHorarios() {
    this.horarioService.getHorarios().subscribe((data) => {
      this.horarios = data;
      this.sortHorarios();
    });
  }

  getAllMedicoEspecialidades() {
    this.medicoEspecialidadService.getMedicoEspecialidades().subscribe((data) => {
      this.medicoEspecialidades = data;
    });
  }

  sortHorarios() {
    this.horarios.sort((a, b) => (a.id || 0) - (b.id || 0));
  }

  addHorario() {
    if (this.newHorario.medicoEspecialidad && this.newHorario.medicoEspecialidad.id) { // Verifica que medicoEspecialidad no sea undefined
      this.horarioService.createHorario(this.newHorario).subscribe((horario) => {
        this.getAllHorarios();
        const medicoEspecialidadLabel = this.getMedicoEspecialidadLabel(this.newHorario);
        this.messageService.add({
          severity: 'success',
          summary: 'Horario Agregado',
          detail: 'Nuevo horario creado correctamente',
        });
  
        // Registro en bitácora
        this.registrarBitacora(
          'Añadir horario',
          `Añadir horario (${this.newHorario.fecha}) desde (${this.newHorario.horaInicio}) hasta las (${this.newHorario.horaFinal}) a (${medicoEspecialidadLabel})`
        );
  
        // Reiniciar el formulario de nuevo horario
        this.newHorario = {
          fecha: '',
          horaInicio: '',
          horaFinal: '',
          cantidadCupos: 0,
          medicoEspecialidad: { id: 0 }
        };
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar un médico y especialidad',
      });
    }
  }
  

  getMedicoEspecialidadLabel(medicoEspecialidad: MedicoEspecialidad): string {
    const especialidadNombre = medicoEspecialidad?.especialidad?.nombre || 'Sin especialidad';
    const medicoNombre = medicoEspecialidad?.medico?.usuario?.nombre || 'Nombre desconocido';
    const medicoApellido = medicoEspecialidad?.medico?.usuario?.apellido || 'Apellido desconocido';
  
    return `Especialidad: ${especialidadNombre} - Médico: ${medicoNombre} ${medicoApellido}`;
  }
  

  deleteHorario(id: number) {
    const horarioEliminado = this.horarios.find((horario) => horario.id === id);
    this.horarioService.deleteHorario(id).subscribe(() => {
      this.horarios = this.horarios.filter((horario) => horario.id !== id);
      this.messageService.add({
        severity: 'success',
        summary: 'Horario Eliminado',
        detail: 'El horario ha sido eliminado correctamente',
      });

      // Registro en bitácora
      if (horarioEliminado) {
        const medicoEspecialidadLabel = this.getMedicoEspecialidadLabel(horarioEliminado);
        this.registrarBitacora(
          'Eliminar horario',
          `Se eliminó horario (${horarioEliminado.fecha}) desde (${horarioEliminado.horaInicio}) hasta las (${horarioEliminado.horaFinal}) a (${medicoEspecialidadLabel})`
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
