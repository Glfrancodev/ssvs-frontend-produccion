export interface Bitacora {
    id?: number;
    correo: string;
    fecha: string; // Se puede usar 'Date' si planeas manejarlo como objeto de fecha en el frontend
    hora: string;
    ip: string;
    accion: string;
    detalle: string;
}
  