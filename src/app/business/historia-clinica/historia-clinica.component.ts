import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AseguradoService } from '../../core/services/asegurado.service';
import { ConsultaService } from '../../core/services/consulta.service';
import { TratamientoService } from '../../core/services/tratamiento.service';
import { Asegurado } from '../../core/models/asegurado';
import { Consulta } from '../../core/models/consulta';
import { Tratamiento } from '../../core/models/tratamiento';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule,ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule]
})
export default class HistoriaClinicaComponent implements OnInit {
  asegurado: Asegurado | null = null;
  consultas: (Consulta & { tieneTratamiento?: boolean })[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private aseguradoService: AseguradoService,
    private consultaService: ConsultaService,
    private tratamientoService: TratamientoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const aseguradoId = Number(params.get('aseguradoId'));
      if (aseguradoId) {
        this.obtenerAsegurado(aseguradoId);
      }
    });
  }

  private obtenerAsegurado(id: number): void {
    this.aseguradoService.getAseguradoById(id).subscribe(
      asegurado => {
        this.asegurado = asegurado;
        if (asegurado.historiaClinica && asegurado.historiaClinica.id) {
          this.obtenerConsultas(asegurado.historiaClinica.id);
        }
      },
      error => {
        console.error('Error al obtener el asegurado:', error);
      }
    );
  }

  private obtenerConsultas(historiaClinicaId: number): void {
    this.consultaService.getConsultasPorHistoriaClinicaId(historiaClinicaId).subscribe(
      consultas => {
        this.consultas = consultas;
        this.verificarTratamientos();
      },
      error => {
        console.error('Error al obtener las consultas:', error);
      }
    );
  }

  private verificarTratamientos(): void {
    this.consultas.forEach(consulta => {
      if (consulta.id !== undefined) {  // Verificamos que el ID esté definido
        this.tratamientoService.getTratamientoByConsultaId(consulta.id).subscribe(
          tratamiento => {
            consulta.tieneTratamiento = !!tratamiento;
          },
          error => {
            consulta.tieneTratamiento = false;
          }
        );
      } else {
        consulta.tieneTratamiento = false;  // Si el ID es undefined, establecemos false
      }
    });
  }
  
  // Método para navegar al componente Tratamiento
  irATratamiento(consultaId: number): void {
    this.router.navigate(['/tratamiento', consultaId]);
  }

}
