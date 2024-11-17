import { Component, OnInit } from '@angular/core';
import { Bitacora } from '../../core/models/bitacora';
import { BitacoraService } from '../../core/services/bitacora.service';
import { PdfExportService } from '../../core/services/pdf-export.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule,ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule]
})
export default class BitacoraComponent implements OnInit {
  bitacoras: Bitacora[] = [];
  selectedRange: { start: Date; end: Date } = { start: new Date(), end: new Date() };
  mostrarSeleccionColumnas = false;

  columnasDisponibles = [
    { campo: 'id', titulo: 'ID', seleccionada: true },
    { campo: 'correo', titulo: 'Correo', seleccionada: true },
    { campo: 'fecha', titulo: 'Fecha', seleccionada: true },
    { campo: 'hora', titulo: 'Hora', seleccionada: true },
    { campo: 'ip', titulo: 'IP', seleccionada: true },
    { campo: 'accion', titulo: 'Acción', seleccionada: true },
    { campo: 'detalle', titulo: 'Detalle', seleccionada: true },
  ];

  constructor(
    private bitacoraService: BitacoraService,
    private pdfExportService: PdfExportService
  ) {}

  ngOnInit(): void {
    this.getAllBitacoras();
  }

  getAllBitacoras(): void {
    this.bitacoraService.getBitacoras().subscribe((data) => {
      this.bitacoras = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    });
  }

  filterByDateRange(): void {
    const startDate = new Date(this.selectedRange.start);
    const endDate = new Date(this.selectedRange.end);

    this.bitacoraService.getBitacorasByDateRange(startDate, endDate).subscribe((data) => {
      this.bitacoras = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    });
  }

  toggleSeleccionColumna(columna: any): void {
    columna.seleccionada = !columna.seleccionada;
  }

  exportarBitacora(): void {
    const columnasSeleccionadas = this.columnasDisponibles.filter((col) => col.seleccionada);

    // Filtrar datos según las columnas seleccionadas
    const datosFiltrados = this.bitacoras.map((bitacora) => {
      const fila: Record<string, any> = {};
      columnasSeleccionadas.forEach((col) => {
        // Garantizamos que col.campo sea una propiedad válida de Bitacora
        const key = col.campo as keyof Bitacora;
        fila[col.campo] = bitacora[key] || ''; // Usar el valor de la propiedad o dejar vacío
      });
      return fila;
    });

    this.pdfExportService.exportBitacora(
      datosFiltrados,
      columnasSeleccionadas, // Pasar columnas completas con campo y título
      'Registro de Bitácora',
      'bitacora'
    );
  }
}
