import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  exportToPDF(data: any[], columns: string[], title: string, fileName: string): void {
    const doc = new jsPDF();

    // Título del PDF
    doc.text(title, 14, 10);

    // Generar la tabla con autoTable
    autoTable(doc, {
      head: [columns],
      body: data.map((item) => columns.map((col) => item[col] || '')), // Extraer solo los datos necesarios
      startY: 20,
    });

    // Descargar el archivo PDF
    doc.save(`${fileName}.pdf`);
  }
}
