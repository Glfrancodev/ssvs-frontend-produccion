import { Rol } from './rol';
import { Permiso } from './permiso';

export interface RolPermiso {
  id?: number; // Opcional, ya que es generado por el backend
  rol: Rol; // Asociación con el modelo de Rol
  permiso: Permiso; // Asociación con el modelo de Permiso
}
