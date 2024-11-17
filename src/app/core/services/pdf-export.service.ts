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
  
    // Crear encabezados
    const headers = columns.map((col) => ({ header: col, dataKey: col }));
  
    // Mapear los datos para incluir solo las columnas seleccionadas
    const body = data.map((row) =>
      columns.map((col) => row[col] || '') // Tomar el valor o dejar vacío si no existe
    );
  
    console.log('Encabezados:', headers);
    console.log('Cuerpo de la tabla:', body);
  
    // Usar autoTable para renderizar los datos
    autoTable(doc, {
      head: [columns], // Usar directamente los títulos de las columnas seleccionadas
      body, // Usar el cuerpo mapeado
      startY: 20,
    });
  
    doc.save(`${fileName}.pdf`);
  }
  
}
