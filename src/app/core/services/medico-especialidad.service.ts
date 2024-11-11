import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico';
import { Especialidad } from '../models/especialidad';
import { MedicoEspecialidad } from '../models/medicoEspecialidad';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoEspecialidadService {
  private apiUrl = 'https://ssvs-backend-produccion-production.up.railway.app/api/medico-especialidad';

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

  getMedicoEspecialidades(): Observable<MedicoEspecialidad[]> {
    return this.http.get<MedicoEspecialidad[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createMedicoEspecialidad(medicoEspecialidad: MedicoEspecialidad): Observable<MedicoEspecialidad> {
    return this.http.post<MedicoEspecialidad>(this.apiUrl, medicoEspecialidad, { headers: this.getAuthHeaders() });
  }

  deleteMedicoEspecialidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Nuevo método para obtener una relación específica de medicoEspecialidad
  getMedicoEspecialidadByEspecialidadAndMedico(especialidadId: number, medicoId: number): Observable<MedicoEspecialidad> {
    const url = `${this.apiUrl}/especialidad/${especialidadId}/medico/${medicoId}`;
    return this.http.get<MedicoEspecialidad>(url, { headers: this.getAuthHeaders() });
  }

}
