import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CupoService } from '../../core/services/cupo.service';
import { Cupo } from '../../core/models/cupo';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BitacoraService } from '../../core/services/bitacora.service';
import { MessageService } from 'primeng/api';
import { Bitacora } from '../../core/models/bitacora';
import { AuthService } from '../../core/services/auth.service';
import { Asegurado } from '../../core/models/asegurado';
import { AseguradoService } from '../../core/services/asegurado.service';

@Component({
  selector: 'app-cupo-medico',
  templateUrl: './cupo-medico.component.html',
  styleUrls: ['./cupo-medico.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule],
  providers: [MessageService]
})
export default class CupoMedicoComponent implements OnInit {
  cupos: Cupo[] = [];

  constructor(
    private route: ActivatedRoute,
    private cupoService: CupoService,
    private router: Router,
    private bitacoraService: BitacoraService,
    private messageService: MessageService,
    private authService: AuthService,
    private aseguradoService: AseguradoService
  ) {}

  ngOnInit(): void {
    // Obtener el horarioId de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const horarioId = Number(params.get('idHorario'));
      if (horarioId) {
        this.obtenerCuposOcupados(horarioId);
      }
    });
  }

  private obtenerCuposOcupados(horarioId: number): void {
    this.cupoService.getCuposOcupadosPorHorario(horarioId).subscribe(
      cupos => {
        this.cupos = cupos;
        console.log('Cupos ocupados:', this.cupos);
      },
      error => {
        console.error('Error al obtener los cupos ocupados:', error);
      }
    );
  }

  // Método para redirigir al componente historia-clinica y registrar en bitácora
  verHistoriaClinica(aseguradoId: number): void {
    this.aseguradoService.getAseguradoById(aseguradoId).subscribe(asegurado => {
      const nombreAsegurado = `${asegurado.usuario!.nombre} ${asegurado.usuario!.apellido}`;
      this.registrarBitacora('Listar Historia Clinica', `Listar Historia Clinica de ${nombreAsegurado}`);
      this.router.navigate(['/historia-clinica', aseguradoId]);
    });
  }

  // Método para redirigir al componente Consulta y registrar en bitácora
  iniciarConsulta(cupoId: number): void {
    this.cupoService.getCupoById(cupoId).subscribe(cupo => {
      const nombreAsegurado = `${cupo.asegurado!.usuario!.nombre} ${cupo.asegurado!.usuario!.apellido}`;
      this.registrarBitacora('Comienzo de la consulta', `Comienzo de la consulta de ${nombreAsegurado}`);
      this.router.navigate(['/consulta', cupoId]);
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
