import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  constructor() {}

  exportToPDF(
    data: any[],
    columns: { campo: string; titulo: string }[],
    title: string,
    fileName: string,
    aseguradoData: string[] = [] // Datos del asegurado opcionales
  ): void {
    const doc = new jsPDF();
  
    doc.setLineWidth(0.5);
    doc.setDrawColor(40, 116, 240); // Azul para los bordes
    doc.rect(5, 5, 200, 287); // Borde alrededor de toda la página
    

    // Agregar el título del documento
    doc.setFontSize(18); // Cambiar el tamaño del texto
    doc.setTextColor(40, 116, 240); // Color azul
    doc.setFont('helvetica', 'bold'); // Fuente en negrita
    doc.text(title, 10, 10); // Texto del título
    
  
    // Agregar los datos del asegurado si existen
    if (aseguradoData.length > 0) {
      doc.setFontSize(12);
      doc.setTextColor(0); // Color negro
      doc.setFont('helvetica', 'normal');
      doc.text('Datos del Asegurado:', 10, 20);
    
      aseguradoData.forEach((linea, index) => {
        // Fondo gris para las líneas del asegurado
        doc.setFillColor(240, 240, 240); // Gris claro
        doc.rect(10, 26 + index * 8, 190, 8, 'F'); // Rectángulo de fondo
        doc.setTextColor(0); // Color negro para el texto
        doc.text(linea, 12, 31 + index * 8); // Texto
      });
    }
    
  
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
      head: [headers], // Títulos de las columnas
      body, // Datos
      startY: 50, // Iniciar la tabla después de los datos del asegurado
      theme: 'striped', // Tema: grid, striped, plain
      headStyles: {
        fillColor: [40, 116, 240], // Azul para el fondo de los encabezados
        textColor: [255, 255, 255], // Texto blanco
        fontSize: 12,
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 4, // Espaciado interno en las celdas
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Fondo gris claro para filas alternas
      },
      tableLineWidth: 0.1, // Grosor de las líneas de la tabla
      tableLineColor: [0, 0, 0], // Color de las líneas de la tabla
    });
    
  
    doc.save(`${fileName}.pdf`);
  }  
}
