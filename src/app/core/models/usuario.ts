import { Rol } from './rol';
import { Asegurado } from './asegurado';
import { Medico } from './medico';

export interface Usuario {
  id?: number; // Opcional ya que es generado por el backend
  ci: string;
  correo: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  estaActivo: boolean;
  rol?: Rol; // Opcional para optimizar la carga de datos cuando no sea necesario
  asegurado?: Asegurado; // Opcional para permitir que algunos usuarios no tengan relación con Asegurado
  medico?: Medico; // Opcional para permitir que algunos usuarios no tengan relación con Medico
}
