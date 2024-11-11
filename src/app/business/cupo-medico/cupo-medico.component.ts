// src/app/business/cupo-medico/cupo-medico.component.ts
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

@Component({
  selector: 'app-cupo-medico',
  templateUrl: './cupo-medico.component.html',
  styleUrls: ['./cupo-medico.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule],
})
export default class CupoMedicoComponent implements OnInit {
  cupos: Cupo[] = [];

  constructor(
    private route: ActivatedRoute,
    private cupoService: CupoService,
    private router: Router
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

  // Método para redirigir al componente historia-clinica
  verHistoriaClinica(aseguradoId: number): void {
    this.router.navigate(['/historia-clinica', aseguradoId]);
  }

  // Método para redirigir al componente Consulta
  iniciarConsulta(cupoId: number): void {
    this.router.navigate(['/consulta', cupoId]);
  }

}