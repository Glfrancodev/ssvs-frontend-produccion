import { Medico } from './medico';
import { Especialidad } from './especialidad';
import { Horario } from './horario';

export interface MedicoEspecialidad {
  id?: number; // ID opcional ya que es generado por el backend
  medico?: Medico; // Relación con el modelo Medico
  especialidad?: Especialidad; // Relación con el modelo Especialidad
  horarios?: Horario[]; // Relación 1 a n con Horario, array opcional para optimizar carga
}
