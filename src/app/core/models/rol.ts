import { RolPermiso } from './rolPermiso';
import { Usuario } from './usuario';

export interface Rol {
  id?: number; // Opcional porque el backend lo genera automáticamente
  nombre: string;
  rolPermisos?: RolPermiso[]; // Opcional para evitar datos innecesarios si no es requerido en la vista actual
  usuarios?: Usuario[]; // Opcional por la misma razón
}
