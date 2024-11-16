import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetaService } from '../../core/services/receta.service';
import { TratamientoService } from '../../core/services/tratamiento.service';
import { ConsultaService } from '../../core/services/consulta.service';
import { Consulta } from '../../core/models/consulta';
import { Receta } from '../../core/models/receta';
import { TableModule } from 'primeng/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tratamiento',
  standalone: true,
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css'],
  imports: [TableModule, CommonModule]
})
export default class TratamientoComponent implements OnInit {
  consulta: Consulta | null = null; // Detalles de la consulta
  recetas: Receta[] = []; // Lista de recetas asociadas
  archivos: { nombre: string; url: string }[] = []; // Archivos asociados
  tratamientoId?: number;

  constructor(
    private recetaService: RecetaService,
    private tratamientoService: TratamientoService,
    private consultaService: ConsultaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const consultaId = Number(this.route.snapshot.paramMap.get('consultaId')); // Obtiene el consultaId de la URL
    if (consultaId) {
      this.obtenerDetallesConsulta(consultaId);
      this.obtenerTratamientoYRecetas(consultaId);
      this.obtenerArchivosConsulta(consultaId);
    }
  }

  private obtenerDetallesConsulta(consultaId: number): void {
    // Llamada para obtener los detalles de la consulta
    this.consultaService.getConsultaPorId(consultaId).subscribe(
      consulta => {
        this.consulta = consulta;
      },
      error => {
        console.error('Error al obtener detalles de la consulta:', error);
      }
    );
  }

  private obtenerTratamientoYRecetas(consultaId: number): void {
    // Llamada para obtener el tratamiento asociado a la consulta
    this.tratamientoService.getTratamientoByConsultaId(consultaId).subscribe(
      tratamiento => {
        if (tratamiento.id) {
          this.tratamientoId = tratamiento.id; // Guarda el tratamientoId
          this.cargarRecetas(tratamiento.id); // Carga las recetas con el tratamientoId obtenido
        }
      },
      error => {
        console.error('Error al obtener el tratamiento:', error);
      }
    );
  }

  private cargarRecetas(tratamientoId: number): void {
    // Llamada para obtener las recetas del tratamiento
    this.recetaService.getRecetasByTratamientoId(tratamientoId).subscribe(
      recetas => {
        this.recetas = recetas;
      },
      error => {
        console.error('Error al cargar recetas:', error);
      }
    );
  }

  private obtenerArchivosConsulta(consultaId: number): void {
    // Llamada para obtener la lista de archivos asociados a la consulta
    this.consultaService.getArchivosPorConsulta(consultaId).subscribe(
      archivos => {
        this.archivos = archivos.map(archivo => ({
          nombre: archivo.nombre,
          url: archivo.url
        }));
      },
      error => {
        console.error('Error al cargar archivos:', error);
      }
    );
  }

  descargarArchivo(nombreArchivo: string): void {
    this.consultaService.descargarArchivo(nombreArchivo).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = nombreArchivo; // Nombre del archivo descargado
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: (error) => {
        console.error('Error al descargar el archivo:', error);
      },
    });
  }

  exportarPDF(): void {
    const content: HTMLElement | null = document.querySelector('.tratamiento-container');
    if (content) {
      html2canvas(content, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('detalle-consulta.pdf');
      });
    } else {
      console.error('Error: no se pudo encontrar el contenido para exportar.');
    }
  }

}
