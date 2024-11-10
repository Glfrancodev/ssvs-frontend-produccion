import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Horario } from '../../core/models/horario';
import { MedicoEspecialidad } from '../../core/models/medicoEspecialidad';
import { HorarioService } from '../../core/services/horario.service';
import { MedicoEspecialidadService } from '../../core/services/medico-especialidad.service';
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
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
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
    this.horarioService.createHorario(this.newHorario).subscribe((horario) => {
      this.getAllHorarios();
      this.messageService.add({
        severity: 'success',
        summary: 'Horario Agregado',
        detail: 'Nuevo horario creado correctamente',
      });
      this.newHorario = {
        fecha: '',
        horaInicio: '',
        horaFinal: '',
        cantidadCupos: 0,
        medicoEspecialidad: { id: 0 }
      };
    });
  }
  getMedicoEspecialidadLabel(medicoEspecialidad: MedicoEspecialidad): string {
    return `Especialidad: ${medicoEspecialidad.especialidad!.nombre} - Médico: ${medicoEspecialidad.medico!.usuario!.nombre} ${medicoEspecialidad.medico!.usuario!.apellido}`;
  }

  deleteHorario(id: number) {
    this.horarioService.deleteHorario(id).subscribe(() => {
      this.horarios = this.horarios.filter((horario) => horario.id !== id);
      this.messageService.add({
        severity: 'success',
        summary: 'Horario Eliminado',
        detail: 'El horario ha sido eliminado correctamente',
      });
    });
  }
  

}
