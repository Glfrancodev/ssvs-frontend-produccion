import { Horario } from './horario';
import { Asegurado } from './asegurado';
import { Consulta } from './consulta';

export interface Cupo {
  id?: number; // ID opcional, ya que es generado por el backend
  numero: number; // Número del cupo
  fechaReservado: string; // Fecha de reserva en formato ISO (LocalDate)
  hora: string; // Hora en formato ISO (LocalTime)
  estado: string; // Estado del cupo, por defecto "Libre"
  horario?: Horario; // Relación con Horario, opcional
  asegurado?: Asegurado; // Relación con Asegurado, opcional
  consulta?: Consulta; // Relación 1 a 1 con Consulta, opcional
}
