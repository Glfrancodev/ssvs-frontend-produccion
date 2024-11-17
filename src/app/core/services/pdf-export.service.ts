import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  constructor() {}

  // Método para exportar Historia Clínica (con datos del asegurado)
  exportHistoriaClinica(
    data: any[],
    columns: { campo: string; titulo: string }[],
    title: string,
    fileName: string,
    aseguradoData: string[] = []
  ): void {
    const doc = new jsPDF();

    // Agregar el título del documento
    doc.setFontSize(18);
    doc.setTextColor(40, 116, 240);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 10, 15);

    // Ajustar la posición inicial para la tabla
    let startY = 25;

    // Agregar los datos del asegurado
    if (aseguradoData.length > 0) {
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.setFont('helvetica', 'normal');
      doc.text('Datos del Asegurado:', 10, startY);

      aseguradoData.forEach((linea, index) => {
        const posY = startY + 6 + index * 8;
        doc.setFillColor(240, 240, 240);
        doc.rect(10, posY - 5, 190, 8, 'F');
        doc.setTextColor(0);
        doc.text(linea, 12, posY);
      });

      startY += 10 + aseguradoData.length * 8;
    }

    // Crear encabezados y cuerpo de la tabla
    this.generateTable(doc, data, columns, startY);

    doc.save(`${fileName}.pdf`);
  }

  // Método para exportar Bitácora (sin datos del asegurado)
  exportBitacora(
    data: any[],
    columns: { campo: string; titulo: string }[],
    title: string,
    fileName: string
  ): void {
    const doc = new jsPDF();

    // Agregar el título del documento
    doc.setFontSize(18);
    doc.setTextColor(40, 116, 240);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 10, 15);

    // Crear encabezados y cuerpo de la tabla
    this.generateTable(doc, data, columns, 25);

    doc.save(`${fileName}.pdf`);
  }

  // Método reutilizable para generar la tabla
  private generateTable(
    doc: jsPDF,
    data: any[],
    columns: { campo: string; titulo: string }[],
    startY: number
  ): void {
    const headers = columns.map((col) => col.titulo);
    const body = data.map((row) =>
      columns.map((col) => row[col.campo] || '')
    );

    autoTable(doc, {
      head: [headers],
      body,
      startY: startY,
      theme: 'striped',
      headStyles: {
        fillColor: [40, 116, 240],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 4,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      tableLineWidth: 0.1,
      tableLineColor: [0, 0, 0],
    });
  }
}
