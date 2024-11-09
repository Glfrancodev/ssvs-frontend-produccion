// core/models/historiaClinica.ts

import { Asegurado } from './asegurado';
import { Consulta } from './consulta';

export interface HistoriaClinica {
  id?: number; // ID opcional, ya que es generado por el backend
  asegurado?: Asegurado; // Relación 1 a 1 con Asegurado, opcional
  consultas?: Consulta[]; // Relación 1 a muchos con Consulta, opcional
}
