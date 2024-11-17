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

    // Crear encabezados como un arreglo de strings
    const headers = columns;

    // Mapear datos para la tabla: solo incluir las propiedades de las columnas seleccionadas
    const body = data.map((row) =>
      headers.map((header) => (row[header] !== undefined ? row[header] : ''))
    );

    console.log('Encabezados:', headers);
    console.log('Cuerpo de la tabla:', body);

    // Usar autoTable para renderizar los datos
    autoTable(doc, {
      head: [headers], // Encabezados
      body, // Cuerpo de la tabla
      startY: 20, // Ajustar para que no se sobreponga con el título
    });

    doc.save(`${fileName}.pdf`);
  }
}
