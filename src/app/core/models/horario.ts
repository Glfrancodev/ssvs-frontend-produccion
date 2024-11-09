import { MedicoEspecialidad } from './medicoEspecialidad';
import { Cupo } from './cupo';

export interface Horario {
  id?: number; // ID opcional ya que es generado por el backend
  fecha: string; // Fecha en formato ISO (LocalDate)
  horaInicio: string; // Hora de inicio en formato ISO (LocalTime)
  horaFinal: string; // Hora de finalización en formato ISO (LocalTime)
  cantidadCupos: number; // Cantidad de cupos disponibles
  medicoEspecialidad?: MedicoEspecialidad; // Relación n a 1 con MedicoEspecialidad
  cupos?: Cupo[]; // Relación 1 a n con Cupo
}
