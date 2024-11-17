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
  import { BitacoraService } from '../../core/services/bitacora.service';
  import { AuthService } from '../../core/services/auth.service';
  import { Bitacora } from '../../core/models/bitacora';
  import { PdfExportService } from '../../core/services/pdf-export.service';

  @Component({
    selector: 'app-historia-clinica',
    templateUrl: './historia-clinica.component.html',
    styleUrls: ['./historia-clinica.component.css'],
    standalone: true,
    imports: [CommonModule, TableModule, FormsModule,ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule]
  })
  export default class HistoriaClinicaComponent implements OnInit {
    asegurado: Asegurado | null = null;
    mostrarSeleccionColumnas: boolean = false;
    columnasDisponibles = [
      { campo: 'id', titulo: 'ID Consulta', seleccionada: true },
      { campo: 'fechaConsulta', titulo: 'Fecha Consulta', seleccionada: true },
      { campo: 'motivoConsulta', titulo: 'Motivo Consulta', seleccionada: true },
      { campo: 'diagnostico', titulo: 'Diagnóstico', seleccionada: true },
      { campo: 'nota', titulo: 'Nota', seleccionada: true }
    ];
    consultas: any[] = []; // Datos de las consultas
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private aseguradoService: AseguradoService,
      private consultaService: ConsultaService,
      private tratamientoService: TratamientoService,
      private bitacoraService: BitacoraService,
      private authService: AuthService,
      private pdfExportService: PdfExportService
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
    
    // Método para registrar en la bitácora
    registrarBitacora(accion: string, detalle: string, callback: () => void): void {
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
            next: () => {
              console.log('Registro de bitácora exitoso');
              callback(); // Llamar al callback cuando se complete el registro
            },
            error: (err) => {
              console.error('Error al registrar en bitácora', err);
              callback(); // Llamar al callback incluso si hay un error
            }
          });
        },
        error: (err) => {
          console.error('Error al obtener IP', err);
          callback(); // Llamar al callback incluso si hay un error en obtener la IP
        }
      });
    }


    // Método para navegar al componente Tratamiento y registrar en bitácora
    irATratamiento(consultaId: number): void {
      if (this.asegurado) {
        const nombreAsegurado = `${this.asegurado.usuario!.nombre} ${this.asegurado.usuario!.apellido}`;
        const detalle = `Listar tratamiento de la consulta (${consultaId}) del paciente (${nombreAsegurado})`;

        // Registrar en bitácora y luego navegar al tratamiento
        this.registrarBitacora('Listar tratamiento', detalle, () => {
          this.router.navigate(['/tratamiento', consultaId]);
        });
      } else {
        console.error('El asegurado no está disponible.');
        // En caso de que no se tenga el asegurado, igual navegamos al tratamiento
        this.router.navigate(['/tratamiento', consultaId]);
      }
    }

    // Método para exportar la historia clínica como PDF
      toggleSeleccionColumna(columna: any): void {
      columna.seleccionada = !columna.seleccionada;
    }

    exportarHistoriaClinica(): void {
      // Obtener las columnas seleccionadas
      const columnasSeleccionadas = this.columnasDisponibles
        .filter((columna) => columna.seleccionada)
        .map((columna) => columna.campo);
    
      // Mapear datos con base en las columnas seleccionadas
      const datosFiltrados = this.consultas.map((consulta) => {
        const fila: Record<string, any> = {};
        columnasSeleccionadas.forEach((campo) => {
          fila[campo] = consulta[campo] || ''; // Usar valores existentes o vacío si no existe
        });
        return fila;
      });
    
      // Mapear títulos de las columnas seleccionadas
      const titulosSeleccionados = this.columnasDisponibles
        .filter((columna) => columna.seleccionada)
        .map((columna) => columna.titulo);
    
      // Exportar usando el servicio de PDF
      this.pdfExportService.exportToPDF(
        datosFiltrados,
        titulosSeleccionados,
        'Historia Clínica',
        'historia_clinica'
      );
    }
}
