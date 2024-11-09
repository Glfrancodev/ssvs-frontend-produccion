import { Usuario } from './usuario';
import { PermisoAusencia } from './permisoAusencia';
import { MedicoEspecialidad } from './medicoEspecialidad';

export interface Medico {
  id?: number; // Opcional porque es generado por el backend
  item: string;
  usuario?: Usuario; // Relación 1 a 1 con Usuario, opcional para optimizar la carga
  permisoAusencias?: PermisoAusencia[]; // Relación 1 a n con PermisoAusencia
  medicoEspecialidades?: MedicoEspecialidad[]; // Relación 1 a n con MedicoEspecialidad
}
