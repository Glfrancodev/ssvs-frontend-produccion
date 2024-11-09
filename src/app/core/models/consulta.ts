import { Cupo } from './cupo';
import { HistoriaClinica } from './historiaClinica';
import { Tratamiento } from './tratamiento';

export interface Consulta {
  id?: number; // ID opcional, ya que es generado por el backend
  fechaConsulta: string; // Fecha de la consulta en formato ISO
  motivoConsulta: string; // Motivo de la consulta
  diagnostico?: string; // Diagnóstico de la consulta, opcional
  nota?: string; // Notas adicionales, opcional
  cupo?: Cupo; // Relación con Cupo, opcional
  historiaClinica?: HistoriaClinica; // Relación con HistoriaClinica, opcional
  tratamiento?: Tratamiento; // Relación con Tratamiento, opcional
}
