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
import { AseguradoService } from '../../core/services/asegurado.service'; // Nuevo import para el servicio de Asegurado
import { AuthService } from '../../core/services/auth.service'; // Servicio de autenticación

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
    private aseguradoService: AseguradoService, // Servicio de Asegurado
    private authService: AuthService // Servicio de autenticación para obtener el correo
  ) {}

  ngOnInit(): void {
    console.log("Inicializando ReservaComponent...");
    this.obtenerEspecialidades();
  }

  obtenerEspecialidades(): void {
    console.log("Obteniendo especialidades...");
    this.especialidadService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
      console.log("Especialidades obtenidas:", this.especialidades);
    });
  }

  onEspecialidadChange(): void {
    console.log("Especialidad seleccionada:", this.selectedEspecialidad);
    if (this.selectedEspecialidad && this.selectedEspecialidad.id !== undefined) {
      this.obtenerMedicosPorEspecialidad(this.selectedEspecialidad.id);
    } else {
      this.medicos = [];
    }
  }
  
  obtenerMedicosPorEspecialidad(especialidadId: number): void {
    console.log(`Obteniendo médicos para la especialidad ID: ${especialidadId}`);
    this.medicoEspecialidadService.getMedicoEspecialidades().subscribe((data) => {
      const medicosFiltrados: MedicoDropdownItem[] = data
        .filter((me) => me.especialidad!.id === especialidadId && me.medico !== undefined)
        .map((me) => ({
          id: me.medico!.id,
          nombreCompleto: `${me.medico!.usuario!.nombre} ${me.medico!.usuario!.apellido}`
        }));

      this.medicos = medicosFiltrados;
      console.log("Médicos filtrados por especialidad:", this.medicos);
    });
  }

  onMedicoChange(): void {
    console.log("Médico seleccionado:", this.selectedMedico);
    if (this.selectedEspecialidad?.id !== undefined && this.selectedMedico?.id !== undefined) {
      this.medicoEspecialidadService
        .getMedicoEspecialidadByEspecialidadAndMedico(this.selectedEspecialidad.id, this.selectedMedico.id)
        .subscribe((data) => {
          this.selectedMedicoEspecialidad = data;
          console.log("MedicoEspecialidad obtenida:", this.selectedMedicoEspecialidad);
          this.obtenerHorariosPorMedicoEspecialidad(this.selectedMedicoEspecialidad.id);
        });
    } else {
      this.selectedMedicoEspecialidad = null;
    }
  }

  obtenerHorariosPorMedicoEspecialidad(medicoEspecialidadId: number): void {
    console.log(`Obteniendo horarios para MedicoEspecialidad ID: ${medicoEspecialidadId}`);
    this.horarioService.getHorariosPorMedicoEspecialidad(medicoEspecialidadId).subscribe((data) => {
      this.horarios = data;
      console.log("Horarios obtenidos:", this.horarios);
    });
  }

  obtenerCuposPorHorario(horarioId: number): void {
    console.log(`Obteniendo cupos para horario ID: ${horarioId}`);
    this.cupoService.getCuposPorHorario(horarioId).subscribe((data) => {
      this.cupos = data;
      console.log("Cupos obtenidos:", this.cupos);
    });
  }

  onHorarioChange(): void {
    console.log("Horario seleccionado:", this.selectedHorario);
    if (this.selectedHorario && this.selectedHorario.id) {
      this.obtenerCuposPorHorario(this.selectedHorario.id);
    } else {
      this.cupos = [];
    }
  }

  reservarCupo(cupo: Cupo): void {
    const correoAsegurado = this.authService.getAuthenticatedUserEmail();
    console.log("Correo del asegurado autenticado:", correoAsegurado);

    if (correoAsegurado) {
        this.aseguradoService.getAseguradoPorCorreo(correoAsegurado).subscribe(
            asegurado => {
                console.log("Asegurado encontrado:", asegurado);

                const cupoActualizado: Cupo = {
                    numero: cupo.numero,
                    fechaReservado: new Date().toISOString().split('T')[0], // Formato de fecha actual
                    estado: "Ocupado",
                    horario: cupo.horario,
                    asegurado: asegurado // Usa el objeto completo del asegurado obtenido
                };

                console.log("Datos del cupo antes de actualizar:", cupoActualizado);
                
                if (cupo.id !== undefined) {
                    this.cupoService.actualizarCupo(cupo.id, cupoActualizado).subscribe(
                        response => {
                            console.log("Reserva realizada exitosamente:", response);
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
