import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../core/services/consulta.service';
import { AuthService } from '../../core/services/auth.service';
import { AseguradoService } from '../../core/services/asegurado.service';
import { PdfExportService } from '../../core/services/pdf-export.service';
import { Consulta } from '../../core/models/consulta';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {CalificacionService } from '../../core/services/calificacion.service';
import { Calificacion } from '../../core/models/calificacion';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mi-historia-clinica',
  standalone: true,
  templateUrl: './mi-historia-clinica.component.html',
  styleUrls: ['./mi-historia-clinica.component.css'],
  imports: [TableModule, CommonModule, ButtonModule, DialogModule, InputNumberModule, TableModule, FormsModule]
})
export default class HistoriaClinicaComponent implements OnInit {
  consultas: Consulta[] = [];
  aseguradoDatos: string[] = [];
  mostrarSeleccionColumnas = false; // Se agrega la propiedad para evitar el error

  mostrarModalCalificacion = false; // Controla el modal
  calificacion = 0; // Almacena la calificación seleccionada
  medicoSeleccionado = ''; // Nombre del médico a calificar
  medicoId = 0; // ID del médico asociado a la consulta seleccionada

  columnasDisponibles = [
    { campo: 'fechaConsulta', titulo: 'Fecha de Consulta', seleccionada: true },
    { campo: 'motivoConsulta', titulo: 'Motivo', seleccionada: true },
    { campo: 'diagnostico', titulo: 'Diagnóstico', seleccionada: true },
    { campo: 'nota', titulo: 'Nota', seleccionada: true },
    { campo: 'medico', titulo: 'Médico', seleccionada: true },
  ];

  constructor(
    private consultaService: ConsultaService,
    private authService: AuthService,
    private aseguradoService: AseguradoService,
    private pdfExportService: PdfExportService,
    private router: Router,
    private calificacionService: CalificacionService,
  ) {}

  toggleSeleccionColumna(columna: any): void {
    columna.seleccionada = !columna.seleccionada;
  }

  ngOnInit(): void {
    this.cargarHistoriaClinica();
  }

  cargarHistoriaClinica(): void {
    const correoAsegurado = this.authService.getAuthenticatedUserEmail();
    if (correoAsegurado) {
      this.aseguradoService.getAseguradoPorCorreo(correoAsegurado).subscribe(
        (asegurado) => {
          if (asegurado.historiaClinica?.id !== undefined) {
            this.obtenerConsultasPorHistoriaClinica(asegurado.historiaClinica.id);
            this.aseguradoDatos = [
              `Nombre: ${asegurado.usuario?.nombre} ${asegurado.usuario?.apellido}`,
              `CI: ${asegurado.usuario?.ci}`,
              `Fecha de Nacimiento: ${asegurado.fechaNacimiento}`,
              `Tipo de Sangre: ${asegurado.tipoSangre || 'N/A'}`,
            ];
          } else {
            console.error('El asegurado no tiene una historia clínica asignada.');
          }
        },
        (error) => console.error('Error al obtener el asegurado:', error)
      );
    } else {
      console.error('No se pudo obtener el correo del asegurado.');
    }
  }

  obtenerConsultasPorHistoriaClinica(historiaClinicaId: number): void {
    this.consultaService.getConsultasPorHistoriaClinicaId(historiaClinicaId).subscribe(
      (consultas) => {
        this.consultas = consultas;
        console.log('Consultas obtenidas:', this.consultas);
      },
      (error) => console.error('Error al obtener las consultas:', error)
    );
  }

  exportarHistoriaClinica(): void {
    const columnasSeleccionadas = this.columnasDisponibles.filter((col) => col.seleccionada);

    const datosFiltrados = this.consultas.map((consulta) => {
      const fila: Record<string, any> = {};
      columnasSeleccionadas.forEach((col) => {
        if (col.campo === 'medico') {
          fila[col.campo] = `${consulta.cupo?.horario?.medicoEspecialidad?.medico?.usuario?.nombre || ''} ${
            consulta.cupo?.horario?.medicoEspecialidad?.medico?.usuario?.apellido || ''
          }`;
        } else {
          const key = col.campo as keyof Consulta;
          fila[col.campo] = consulta[key] || '';
        }
      });
      return fila;
    });

    this.pdfExportService.exportHistoriaClinica(
      datosFiltrados,
      columnasSeleccionadas,
      'Historia Clínica',
      'historia_clinica',
      this.aseguradoDatos
    );
  }

  irATratamiento(consultaId: number): void {
    this.router.navigate(['/tratamiento', consultaId]);
  }

  abrirCalificacion(consulta: Consulta): void {
    this.mostrarModalCalificacion = true;
    this.medicoSeleccionado = `${consulta.cupo?.horario?.medicoEspecialidad?.medico?.usuario?.nombre || ''} ${
      consulta.cupo?.horario?.medicoEspecialidad?.medico?.usuario?.apellido || ''
    }`;
    this.medicoId = consulta.cupo?.horario?.medicoEspecialidad?.medico?.id || 0;
  }

  guardarCalificacion(): void {
    const aseguradocorreo = this.authService.getAuthenticatedUserEmail(); // Obtener el correo del asegurado
  
    if (!aseguradocorreo) {
      console.error('El correo del asegurado no está disponible. No se puede guardar la calificación.');
      return;
    }
  
    // Obtener el asegurado a partir del correo
    this.aseguradoService.getAseguradoPorCorreo(aseguradocorreo).subscribe(
      (asegurado) => {
        const aseguradoId = asegurado.id; // Obtener el ID del asegurado desde la respuesta
        if (!aseguradoId) {
          console.error('El asegurado no tiene un ID válido. No se puede guardar la calificación.');
          return;
        }
  
        // Verificar si ya existe una calificación para este médico y asegurado
        this.calificacionService.buscarCalificacion(aseguradoId, this.medicoId).subscribe(
          (calificacionExistente) => {
            if (calificacionExistente) {
              // Si existe una calificación, actualizarla
              calificacionExistente.estrella = this.calificacion; // Actualizar la calificación con la nueva
              this.calificacionService.actualizarCalificacion(calificacionExistente).subscribe(
                () => {
                  console.log('Calificación actualizada con éxito.');
                  this.mostrarModalCalificacion = false;
                },
                (error) => {
                  console.error('Error al actualizar la calificación:', error);
                }
              );
            } else {
              // Si no existe una calificación, crear una nueva
              const nuevaCalificacion: Calificacion = {
                medico: { id: this.medicoId, item: '' }, // Relacionar con el médico
                asegurado: { id: aseguradoId }, // Relacionar con el asegurado
                estrella: this.calificacion // Asignar la calificación
              };
  
              // Guardar la calificación
              this.calificacionService.crearCalificacion(nuevaCalificacion).subscribe(
                () => {
                  console.log('Calificación guardada con éxito.');
                  this.mostrarModalCalificacion = false;
                },
                (error) => {
                  console.error('Error al guardar la calificación:', error);
                }
              );
            }
          },
          (error) => {
            console.error('Error al buscar calificación existente:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener el asegurado por correo:', error);
      }
    );
  }
  
}
