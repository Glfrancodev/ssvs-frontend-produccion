import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadService } from '../../core/services/especialidad.service';
import { MedicoEspecialidadService } from '../../core/services/medico-especialidad.service';
import { HorarioService } from '../../core/services/horario.service'; // Añadir servicio de Horarios
import { Especialidad } from '../../core/models/especialidad';
import { Medico } from '../../core/models/medico';
import { Horario } from '../../core/models/horario'; // Importar modelo de Horario
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { Cupo } from '../../core/models/cupo';
import { CupoService } from '../../core/services/cupo.service';

interface MedicoDropdownItem {
  id: number | undefined;
  nombreCompleto: string;
}

@Component({
  selector: 'app-cupo',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    DropdownModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputGroupAddonModule,
    InputGroupModule
  ],
  templateUrl: './cupo.component.html',
  styleUrls: ['./cupo.component.css']
})

export default class CupoComponent implements OnInit {
  especialidades: Especialidad[] = [];

  horarios: Horario[] = []; // Añadir lista de horarios
  cupos: Cupo[] = [];
  
  selectedEspecialidad: Especialidad | null = null;
  selectedMedico: Medico | null = null;
  selectedMedicoEspecialidad: any;
  selectedHorario: Horario | null = null;
  medicos: MedicoDropdownItem[] = []; // Cambiamos el tipo aquí

  constructor(
    private especialidadService: EspecialidadService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private horarioService: HorarioService, // Inyectar servicio de Horarios
    private cupoService: CupoService
  ) {}

  ngOnInit(): void {
    this.obtenerEspecialidades();
  }

  obtenerEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
    });
  }

  onEspecialidadChange(): void {
    if (this.selectedEspecialidad && this.selectedEspecialidad.id !== undefined) {
      this.obtenerMedicosPorEspecialidad(this.selectedEspecialidad.id);
    } else {
      this.medicos = [];
    }
  }
  
  obtenerMedicosPorEspecialidad(especialidadId: number): void {
    this.medicoEspecialidadService.getMedicoEspecialidades().subscribe((data) => {
      const medicosFiltrados: MedicoDropdownItem[] = data
        .filter((me) => me.especialidad!.id === especialidadId && me.medico !== undefined)
        .map((me) => ({
          id: me.medico!.id,
          nombreCompleto: `${me.medico!.usuario!.nombre} ${me.medico!.usuario!.apellido}`
        }));

      this.medicos = medicosFiltrados;
    });
  }

  onMedicoChange(): void {
    if (this.selectedEspecialidad?.id !== undefined && this.selectedMedico?.id !== undefined) {
      this.medicoEspecialidadService
        .getMedicoEspecialidadByEspecialidadAndMedico(this.selectedEspecialidad.id, this.selectedMedico.id)
        .subscribe((data) => {
          this.selectedMedicoEspecialidad = data;
          console.log('MedicoEspecialidad seleccionado:', this.selectedMedicoEspecialidad);
          this.obtenerHorariosPorMedicoEspecialidad(this.selectedMedicoEspecialidad.id);
        });
    } else {
      this.selectedMedicoEspecialidad = null;
    }
  }

  obtenerHorariosPorMedicoEspecialidad(medicoEspecialidadId: number): void {
    this.horarioService.getHorariosPorMedicoEspecialidad(medicoEspecialidadId).subscribe((data) => {
      this.horarios = data.map(horario => ({
        ...horario,
        label: `${horario.fecha} - ${horario.horaInicio} a ${horario.horaFinal}`
      }));
    });
  }

  obtenerCuposPorHorario(horarioId: number): void {
    this.cupoService.getCuposPorHorario(horarioId).subscribe((data) => {
      this.cupos = data;
    });
  }

  onHorarioChange(): void {
    if (this.selectedHorario && this.selectedHorario.id) {
      this.obtenerCuposPorHorario(this.selectedHorario.id);
    } else {
      this.cupos = [];
    }
  }

}
