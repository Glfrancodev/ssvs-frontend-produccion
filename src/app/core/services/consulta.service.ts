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
  private apiUrl = 'http://localhost:8080/api/consulta';

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
}