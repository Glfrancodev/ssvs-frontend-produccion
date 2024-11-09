import { RolPermiso } from './rolPermiso';

export interface Permiso {
  id?: number; // Opcional, ya que es generado por el backend
  nombre: string;
  descripcion: string;
  rolPermisos?: RolPermiso[]; // Opcional para evitar sobrecargar de datos innecesarios en el frontend
}