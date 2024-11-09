import { Medico } from './medico';

export interface PermisoAusencia {
  id?: number; // Opcional ya que es generado por el backend
  fechaPermiso: string; // LocalDate se representa como string en formato YYYY-MM-DD
  descripcion: string;
  estado: string; // Estado inicial predeterminado: "Revisión"
  medico?: Medico; // Relación n a 1 con Medico, opcional para optimizar carga
}