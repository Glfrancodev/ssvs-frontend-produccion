import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadService } from '../../core/services/especialidad.service';
import { MedicoEspecialidadService } from '../../core/services/medico-especialidad.service';
import { HorarioService } from '../../core/services/horario.service';
import { BitacoraService } from '../../core/services/bitacora.service';
import { Especialidad } from '../../core/models/especialidad';
import { Medico } from '../../core/models/medico';
import { Horario } from '../../core/models/horario';
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
import { AuthService } from '../../core/services/auth.service';
import { Bitacora } from '../../core/models/bitacora';

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
  horarios: Horario[] = [];
  cupos: Cupo[] = [];
  
  selectedEspecialidad: Especialidad | null = null;
  selectedMedico: Medico | null = null;
  selectedMedicoEspecialidad: any;
  selectedHorario: Horario | null = null;
  medicos: MedicoDropdownItem[] = [];

  constructor(
    private especialidadService: EspecialidadService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private horarioService: HorarioService,
    private cupoService: CupoService,
    private bitacoraService: BitacoraService,
    private authService: AuthService
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

      // Obtener los datos completos del médico asociado
      this.medicoEspecialidadService.getMedicoEspecialidadById(this.selectedMedicoEspecialidad.id).subscribe((medicoEspecialidadCompleto) => {
        const especialidadLabel = this.selectedEspecialidad?.nombre || 'Especialidad desconocida';
        const medicoLabel = `${medicoEspecialidadCompleto.medico!.usuario!.nombre} ${medicoEspecialidadCompleto.medico!.usuario!.apellido}`;
        const horarioLabel = `${this.selectedHorario?.fecha} de ${this.selectedHorario?.horaInicio} a ${this.selectedHorario?.horaFinal}`;

        // Registrar en bitácora con datos completos
        this.registrarBitacora('Listar cupos', `Listar cupos de ${especialidadLabel} de ${medicoLabel} el ${horarioLabel}`);
      });
    } else {
      this.cupos = [];
    }
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
