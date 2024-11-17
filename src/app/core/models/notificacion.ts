import { Asegurado } from './asegurado';

export interface Notificacion {
  id?: number; // ID opcional, generado por el backend
  descripcion: string; // Descripción de la notificación
  leido: boolean; // Estado de si la notificación fue leída
  asegurado?: Asegurado; // Relación con el asegurado, opcional
}
