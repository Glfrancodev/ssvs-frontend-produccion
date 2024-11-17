import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadService } from '../../core/services/especialidad.service';
import { MedicoEspecialidadService } from '../../core/services/medico-especialidad.service';
import { HorarioService } from '../../core/services/horario.service';
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
import { AseguradoService } from '../../core/services/asegurado.service';
import { AuthService } from '../../core/services/auth.service';
import { MedicoService } from '../../core/services/medico.service';

interface MedicoDropdownItem {
  id: number | undefined;
  nombreCompleto: string;
}

@Component({
  selector: 'app-reserva',
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
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export default class ReservaComponent implements OnInit {
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
    private aseguradoService: AseguradoService,
    private authService: AuthService,
    private medicoService: MedicoService
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
      const medicosFiltrados: MedicoDropdownItem[] = [];
  
      const requests = data
        .filter((me) => me.especialidad!.id === especialidadId && me.medico !== undefined)
        .map((me) => {
          const medicoId = me.medico!.id!;
          const nombreCompleto = `${me.medico!.usuario!.nombre} ${me.medico!.usuario!.apellido}`;
          return this.medicoService.obtenerPromedioCalificaciones(medicoId).toPromise()
            .then((promedio) => {
              medicosFiltrados.push({
                id: medicoId,
                nombreCompleto: `${nombreCompleto} - ${promedio?.toFixed(1) || 'Sin calificaciones'} ★`
              });
            });
        });
  
      Promise.all(requests).then(() => {
        this.medicos = medicosFiltrados;
      });
    });
  }
  

  onMedicoChange(): void {
    if (this.selectedEspecialidad?.id !== undefined && this.selectedMedico?.id !== undefined) {
      this.medicoEspecialidadService
        .getMedicoEspecialidadByEspecialidadAndMedico(this.selectedEspecialidad.id, this.selectedMedico.id)
        .subscribe((data) => {
          this.selectedMedicoEspecialidad = data;
          this.obtenerHorariosPorMedicoEspecialidad(this.selectedMedicoEspecialidad.id);
        });
    } else {
      this.selectedMedicoEspecialidad = null;
    }
  }

  obtenerHorariosPorMedicoEspecialidad(medicoEspecialidadId: number): void {
    this.horarioService.getHorariosPorMedicoEspecialidad(medicoEspecialidadId).subscribe((data) => {
      this.horarios = data.map((horario) => ({
        ...horario,
        formattedLabel: `${horario.fecha} - ${horario.horaInicio} a ${horario.horaFinal}`
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

  reservarCupo(cupo: Cupo): void {
    const correoAsegurado = this.authService.getAuthenticatedUserEmail();

    if (correoAsegurado) {
      this.aseguradoService.getAseguradoPorCorreo(correoAsegurado).subscribe(
        asegurado => {
          const cupoActualizado: Cupo = {
            numero: cupo.numero,
            fechaReservado: new Date().toISOString().split('T')[0],
            estado: "Ocupado",
            horario: cupo.horario,
            asegurado: {id: asegurado.id}
          };

          if (cupo.id !== undefined) {
            this.cupoService.reservarCupo(cupo.id, cupoActualizado).subscribe(
              response => {
                console.log("Reserva realizada exitosamente:", response);
                this.obtenerCuposPorHorario(this.selectedHorario!.id!);
              },
              error => {
                console.error("Error al actualizar el cupo:", error);
              }
            );
          } else {
            console.error("El ID del cupo es undefined. No se puede actualizar el cupo.");
          }
        },
        error => {
          console.error("Error al obtener el asegurado por correo:", error);
        }
      );
    } else {
      console.error("No se pudo obtener el correo del asegurado.");
    }
  }
}
