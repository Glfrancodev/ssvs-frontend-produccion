import { Usuario } from './usuario';

export interface Medico {
  id?: number; // Opcional porque es generado por el backend
  item: string;
  usuario?: Usuario; // Relación 1 a 1 con Usuario, opcional para optimizar la carga
}
