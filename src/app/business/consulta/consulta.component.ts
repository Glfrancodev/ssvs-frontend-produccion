// src/app/business/consulta/consulta.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../../core/services/consulta.service';
import { RecetaService } from '../../core/services/receta.service';
import { TratamientoService } from '../../core/services/tratamiento.service';
import { Consulta } from '../../core/models/consulta';
import { Tratamiento } from '../../core/models/tratamiento';
import { Receta } from '../../core/models/receta';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CupoService } from '../../core/services/cupo.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule]
})
export default class ConsultaComponent implements OnInit {
  motivo: string = '';
  diagnostico: string = '';
  nota: string = '';
  recetas: { medicamento: string; frecuencia: string; fechaInicio: string; fechaFinal: string }[] = [];
  cupoId?: number;
  historiaClinicaId?: number;

  constructor(
    private route: ActivatedRoute,
    private consultaService: ConsultaService,
    private tratamientoService: TratamientoService,
    private recetaService: RecetaService,
    private cupoService: CupoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cupoId = Number(this.route.snapshot.paramMap.get('cupoId'));
    
    if (this.cupoId) {
      this.obtenerHistoriaClinicaIdDesdeCupo(this.cupoId);
    }
  }

  private obtenerHistoriaClinicaIdDesdeCupo(cupoId: number): void {
    this.cupoService.getCupoById(cupoId).subscribe(
      cupo => {
        if (cupo && cupo.asegurado && cupo.asegurado.historiaClinica) {
          this.historiaClinicaId = cupo.asegurado.historiaClinica.id;
          console.log("Historia Clínica ID obtenida:", this.historiaClinicaId);
        } else {
          console.error('No se encontró la historia clínica para el asegurado en el cupo especificado.');
        }
      },
      error => {
        console.error('Error al obtener el cupo:', error);
      }
    );
  }

  agregarReceta(): void {
    this.recetas.push({
      medicamento: '',
      frecuencia: '',
      fechaInicio: '',
      fechaFinal: ''
    });
  }

  guardarConsulta(): void {
    if (!this.cupoId || !this.historiaClinicaId) {
      console.error("Faltan datos para guardar la consulta.");
      return;
    }

    // Paso 1: Crear la consulta
    const nuevaConsulta: Consulta = {
      fechaConsulta: new Date().toISOString().split('T')[0],
      motivoConsulta: this.motivo,
      diagnostico: this.diagnostico,
      nota: this.nota,
      cupo: { id: this.cupoId, numero: 0, fechaReservado: '', hora: '', estado: '', horario: undefined, asegurado: undefined },
      historiaClinica: { id: this.historiaClinicaId }
    };

    this.consultaService.createConsulta(nuevaConsulta).subscribe(
      consultaGuardada => {
        console.log('Consulta guardada:', consultaGuardada);

        if (this.recetas.length > 0) {
          const nuevoTratamiento: Tratamiento = {
            fecha: consultaGuardada.fechaConsulta,
            consulta: { id: consultaGuardada.id, fechaConsulta: '', motivoConsulta: '', diagnostico: '', nota: '', cupo: undefined, historiaClinica: undefined }
          };

          this.tratamientoService.createTratamiento(nuevoTratamiento).subscribe(
            tratamientoGuardado => {
              console.log('Tratamiento guardado:', tratamientoGuardado);

              this.recetas.forEach(recetaData => {
                const nuevaReceta: Receta = {
                  medicamento: recetaData.medicamento,
                  frecuencia: recetaData.frecuencia,
                  fechaInicio: recetaData.fechaInicio,
                  fechaFinal: recetaData.fechaFinal,
                  tratamiento: { id: tratamientoGuardado.id, fecha: '' }
                };

                this.recetaService.createReceta(nuevaReceta).subscribe(
                  recetaGuardada => {
                    console.log('Receta guardada:', recetaGuardada);
                  },
                  error => {
                    console.error('Error al guardar receta:', error);
                  }
                );
              });

              // Cambia el estado del cupo a "Terminado" después de guardar todo
              this.actualizarEstadoCupo();
            },
            error => {
              console.error('Error al guardar el tratamiento:', error);
            }
          );
        } else {
          // Cambia el estado del cupo a "Terminado" si no hay recetas
          this.actualizarEstadoCupo();
        }
      },
      error => {
        console.error('Error al guardar la consulta:', error);
      }
    );
  }

  private actualizarEstadoCupo(): void {
    this.cupoService.actualizarEstadoCupo(this.cupoId!, "Terminado").subscribe(
      cupoActualizado => {
        console.log('Estado del cupo actualizado a "Terminado":', cupoActualizado);
        // Redirigir al dashboard después de completar todo el proceso
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error al actualizar el estado del cupo:', error);
      }
    );
  }
}
