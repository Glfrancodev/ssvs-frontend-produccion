import { Usuario } from './usuario';
import { Cupo } from './cupo';
import { HistoriaClinica } from './historiaClinica';

export interface Asegurado {
  id?: number; // Opcional ya que es generado por el backend
  tipoSangre: string;
  sexo: string; // Usando string en lugar de char para simplificar en frontend
  fechaNacimiento: string; // LocalDate se representará como string en el frontend
  usuario?: Usuario; // Relación 1 a 1 con Usuario, opcional para optimizar carga
  cupos?: Cupo[]; // Relación 1 a n con Cupo
  historiaClinica?: HistoriaClinica; // Relación 1 a 1 con HistoriaClinica
}
