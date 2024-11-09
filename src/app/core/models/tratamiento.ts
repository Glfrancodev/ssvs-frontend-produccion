import { Consulta } from './consulta';
import { Receta } from './receta';

export interface Tratamiento {
  id?: number; // ID opcional, ya que es generado por el backend
  fecha: string; // Fecha del tratamiento en formato ISO (yyyy-MM-dd)
  consulta?: Consulta; // Relación con Consulta, opcional
  recetas?: Receta[]; // Lista de recetas relacionadas, opcional
}
