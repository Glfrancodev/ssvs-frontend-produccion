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
import { BitacoraService } from '../../core/services/bitacora.service';
import { AuthService } from '../../core/services/auth.service';
import { Bitacora } from '../../core/models/bitacora';
import { lastValueFrom } from 'rxjs';

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
  archivosAdjuntos: File[] = []; // Lista de archivos adjuntos
  cargando: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private consultaService: ConsultaService,
    private tratamientoService: TratamientoService,
    private recetaService: RecetaService,
    private cupoService: CupoService,
    private router: Router,
    private bitacoraService: BitacoraService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cupoId = Number(this.route.snapshot.paramMap.get('cupoId'));
    
    if (this.cupoId) {
      this.obtenerHistoriaClinicaIdDesdeCupo(this.cupoId);
    }
  }

  // Método para manejar la selección de archivos
  seleccionarArchivos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        this.archivosAdjuntos.push(file);
      });
    }
  }

  // Método para eliminar un archivo de la lista
  eliminarArchivo(index: number): void {
    this.archivosAdjuntos.splice(index, 1);
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
      async consultaGuardada => {
        console.log('Consulta guardada:', consultaGuardada);
  
        if (consultaGuardada.id) {
          // Mostrar "Guardando..." mientras se suben los archivos
          this.cargando = true;
          this.mostrarCargando(true);
  
          try {
            // Subir todos los archivos y esperar que terminen
            const uploadRequests = this.archivosAdjuntos.map(archivo =>
              lastValueFrom(this.consultaService.subirArchivoConsulta(archivo, consultaGuardada.id!))
            );
            await Promise.all(uploadRequests); // Espera que todas las subidas terminen
            console.log('Todos los archivos subidos correctamente.');
          } catch (error) {
            console.error('Error al subir archivos:', error);
          } finally {
            // Ocultar "Guardando..." después de completar las subidas
            this.cargando = false;
            this.mostrarCargando(false);
          }
        } else {
          console.error('El ID de la consulta guardada es undefined.');
        }
  
        // Registrar en bitácora la creación de la consulta
        this.registrarBitacora('Guardar consulta', `Consulta de ${this.cupoId} de ${nuevaConsulta.cupo?.asegurado?.usuario?.nombre || 'asegurado'} añadida`);
  
        if (this.recetas.length > 0) {
          const nuevoTratamiento: Tratamiento = {
            fecha: consultaGuardada.fechaConsulta,
            consulta: { id: consultaGuardada.id, fechaConsulta: '', motivoConsulta: '', diagnostico: '', nota: '', cupo: undefined, historiaClinica: undefined }
          };
  
          this.tratamientoService.createTratamiento(nuevoTratamiento).subscribe(
            tratamientoGuardado => {
              console.log('Tratamiento guardado:', tratamientoGuardado);
  
              // Registrar en bitácora la creación del tratamiento
              this.registrarBitacora('Guardar tratamiento', `Tratamiento ${tratamientoGuardado.id} generado para consulta ${consultaGuardada.id}`);
  
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
  
                    // Registrar en bitácora la creación de cada receta
                    this.registrarBitacora('Guardar receta', `Receta ${recetaGuardada.id} para tratamiento ${tratamientoGuardado.id}`);
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
  
  // Método para mostrar u ocultar un indicador de carga
  mostrarCargando(mostrar: boolean): void {
    if (mostrar) {
      // Lógica para mostrar un indicador de carga (puede ser un spinner o texto)
      console.log('Mostrando indicador de carga...');
    } else {
      // Lógica para ocultarlo
      console.log('Ocultando indicador de carga...');
    }
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
