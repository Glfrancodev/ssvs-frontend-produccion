import { MedicoEspecialidad } from './medicoEspecialidad';

export interface Especialidad {
  id?: number; // ID opcional ya que es generado por el backend
  nombre: string; // Nombre de la especialidad
  descripcion: string; // Descripción de la especialidad
  medicoEspecialidades?: MedicoEspecialidad[]; // Relación 1 a n con MedicoEspecialidad
}
