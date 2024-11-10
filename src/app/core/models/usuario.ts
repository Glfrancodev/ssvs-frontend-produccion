import { Rol } from './rol';

export interface Usuario {
  id?: number; // Opcional ya que es generado por el backend
  ci: string;
  correo: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  estaActivo: boolean;
  rol?: Rol; // Opcional para optimizar la carga de datos cuando no sea necesario
}
