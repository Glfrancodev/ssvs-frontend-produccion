import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialidadService } from '../../core/services/especialidad.service';
import { MedicoService } from '../../core/services/medico.service';
import { MedicoEspecialidadService } from '../../core/services/medico-especialidad.service';
import { AuthService } from '../../core/services/auth.service';
import { Especialidad } from '../../core/models/especialidad';
import { CommonModule } from '@angular/common';
import { MedicoEspecialidad } from '../../core/models/medicoEspecialidad';
import { Horario } from '../../core/models/horario';
import { HorarioService } from '../../core/services/horario.service';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BitacoraService } from '../../core/services/bitacora.service';
import { Bitacora } from '../../core/models/bitacora';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css'],
  standalone: true,
  imports: [CommonModule,TableModule, ToastModule, DropdownModule, FormsModule, ButtonModule, RippleModule, InputGroupAddonModule,InputGroupModule],
  providers: [MessageService]
})
export default class AtencionComponent implements OnInit {
  especialidadSeleccionada: Especialidad = { id: undefined, nombre: '', descripcion: '' };
  medicoEspecialidad: MedicoEspecialidad | null = null;
  horarios: Horario[] = []; // Nueva propiedad para almacenar los horarios

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inyección del router para navegación
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private authService: AuthService,
    private horarioService: HorarioService,
    private bitacoraService: BitacoraService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const nombreEspecialidad = params.get('especialidad');
      if (nombreEspecialidad) {
        this.obtenerEspecialidadPorNombre(nombreEspecialidad);
      }
    });
  }

  private obtenerEspecialidadPorNombre(nombre: string): void {
    this.especialidadService.getEspecialidadByNombre(nombre).subscribe(
      especialidad => {
        this.especialidadSeleccionada = especialidad;
        this.obtenerMedico();
      },
      error => {
        console.error('Error al obtener la especialidad:', error);
      }
    );
  }

  private obtenerMedico(): void {
    const correoMedico = this.authService.getAuthenticatedUserEmail();
    if (correoMedico && this.especialidadSeleccionada.id !== undefined) {
      this.medicoService.getMedicoPorCorreo(correoMedico).subscribe(
        medico => {
          if (medico.id !== undefined && this.especialidadSeleccionada.id !== undefined) {
            this.obtenerMedicoEspecialidad(medico.id, this.especialidadSeleccionada.id);
          } else {
            console.error('El ID del médico o de la especialidad es undefined.');
          }
        },
        error => {
          console.error('Error al obtener el médico:', error);
        }
      );
    } else {
      console.error('Correo médico o ID de especialidad no disponible.');
    }
  }

  private obtenerMedicoEspecialidad(medicoId: number, especialidadId: number): void {
    this.medicoEspecialidadService.getMedicoEspecialidadByEspecialidadAndMedico(especialidadId, medicoId).subscribe(
      medicoEspecialidad => {
        this.medicoEspecialidad = medicoEspecialidad;
        console.log('MedicoEspecialidad obtenida:', this.medicoEspecialidad);
        if (this.medicoEspecialidad && this.medicoEspecialidad.id !== undefined) {
          this.obtenerHorariosPorMedicoEspecialidad(this.medicoEspecialidad.id);
        }
      },
      error => {
        console.error('Error al obtener MedicoEspecialidad:', error);
      }
    );
  }

  private obtenerHorariosPorMedicoEspecialidad(medicoEspecialidadId: number): void {
    this.horarioService.getHorariosPorMedicoEspecialidad(medicoEspecialidadId).subscribe(
      horarios => {
        this.horarios = horarios;
        console.log('Horarios obtenidos:', this.horarios);
      },
      error => {
        console.error('Error al obtener los horarios:', error);
      }
    );
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

  irACupoMedico(idHorario: number | undefined): void {
    if (idHorario !== undefined) {
      const horario = this.horarios.find(h => h.id === idHorario);
      const especialidad = this.especialidadSeleccionada.nombre;

      // Registro en la bitácora
      const detalle = `Listar mis cupos ocupados del (${horario?.fecha} de ${horario?.horaInicio} a ${horario?.horaFinal}) de (${especialidad})`;
      this.registrarBitacora('Listar cupos ocupados', detalle);

      // Navega a la página de cupo médico
      this.router.navigate(['/cupo-medico', idHorario]);
    } else {
      console.error('El ID del horario es undefined.');
    }
  }

}
