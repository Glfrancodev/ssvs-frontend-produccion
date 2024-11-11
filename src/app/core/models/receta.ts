// core/models/receta.ts

export interface Receta {
  id?: number; // ID opcional, ya que es generado por el backend
  medicamento: string;
  frecuencia: string;
  fechaInicio: string; // Se usa string para facilitar la conversión de LocalDate
  fechaFinal: string; // Se usa string para facilitar la conversión de LocalDate
}