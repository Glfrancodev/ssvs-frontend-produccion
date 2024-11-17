import { Asegurado } from './asegurado';
import { Medico } from './medico';

export interface Calificacion {
  id?: number; // ID opcional, generado por el backend
  estrella: number; // Cantidad de estrellas otorgadas
  asegurado?: Asegurado; // Relación con el asegurado, opcional
  medico?: Medico; // Relación con el médico, opcional
}
