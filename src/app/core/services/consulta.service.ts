// src/app/core/services/consulta.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'https://ssvs-backend-produccion-production.up.railway.app/api/consulta';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  private getMultipartAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });
  }

  // Obtener todas las consultas
  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Obtener una consulta por ID
  getConsultaPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear una nueva consulta
  createConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.apiUrl, consulta, { headers: this.getAuthHeaders() });
  }

  // Actualizar una consulta
  actualizarConsulta(id: number, consulta: Consulta): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}`, consulta, { headers: this.getAuthHeaders() });
  }

  // Eliminar una consulta por ID
  eliminarConsulta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Obtener todas las consultas por historia clínica ID
  getConsultasPorHistoriaClinicaId(historiaClinicaId: number): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/historia/${historiaClinicaId}`, { headers: this.getAuthHeaders() });
  }

  // src/app/core/services/consulta.service.ts
  subirArchivoConsulta(archivo: File, consultaId: number): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('consultaId', consultaId.toString());

    return this.http.post<{ url: string }>(
        `https://ssvs-backend-produccion-production.up.railway.app/api/archivos/subir`,
        formData,
        { headers: this.getMultipartAuthHeaders() }
    );
  }

  getArchivosPorConsulta(consultaId: number): Observable<{ nombre: string; url: string }[]> {
    return this.http.get<{ nombre: string; url: string }[]>(
      `https://ssvs-backend-produccion-production.up.railway.app/api/archivos/consulta/${consultaId}`,
      { headers: this.getAuthHeaders() }
    );
  }
  
  descargarArchivo(nombreArchivo: string): Observable<Blob> {
    const url = `https://ssvs-backend-produccion-production.up.railway.app/api/archivos/descargar/${nombreArchivo}`;
    return this.http.get(url, { headers: this.getAuthHeaders(), responseType: 'blob' });
  }

}