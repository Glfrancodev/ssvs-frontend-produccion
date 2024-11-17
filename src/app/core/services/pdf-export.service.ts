import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  constructor() {}

  exportToPDF(data: any[], columns: string[], title: string, fileName: string): void {
    const doc = new jsPDF();
    doc.text(title, 10, 10);

    // Encabezados como un array de strings
    const headers = columns;

    // Usar autoTable para renderizar los datos
    autoTable(doc, {
      head: [headers], // Encabezados en un array de arrays
      body: data.map((row) => headers.map((header) => row[header])), // Mapear datos según las columnas seleccionadas
      startY: 20, // Ajustar para que no se sobreponga con el título
    });

    doc.save(`${fileName}.pdf`);
  }
}
