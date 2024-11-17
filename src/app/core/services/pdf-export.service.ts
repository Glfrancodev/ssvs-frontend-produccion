import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  constructor() {}

  exportToPDF(data: any[], columns: { campo: string; titulo: string }[], title: string, fileName: string): void {
    const doc = new jsPDF();
    doc.text(title, 10, 10);
  
    // Crear encabezados con los títulos de las columnas seleccionadas
    const headers = columns.map((col) => col.titulo);
  
    // Mapear los datos para incluir solo las columnas seleccionadas
    const body = data.map((row) =>
      columns.map((col) => row[col.campo] || '') // Usar los campos para extraer datos
    );
  
    console.log('Encabezados:', headers);
    console.log('Cuerpo de la tabla:', body);
  
    // Usar autoTable para renderizar los datos
    autoTable(doc, {
      head: [headers], // Usar los encabezados
      body, // Usar el cuerpo mapeado
      startY: 20,
    });
  
    doc.save(`${fileName}.pdf`);
  }
}
