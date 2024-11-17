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

@Component({
  selector: 'app-mi-historia-clinica',
  standalone: true,
  templateUrl: './mi-historia-clinica.component.html',
  styleUrls: ['./mi-historia-clinica.component.css'],
  imports: [TableModule, CommonModule, ButtonModule]
})
export default class HistoriaClinicaComponent implements OnInit {
  consultas: Consulta[] = [];
  aseguradoDatos: string[] = [];
  mostrarSeleccionColumnas = false; // Se agrega la propiedad para evitar el error

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
    private router: Router
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
}
