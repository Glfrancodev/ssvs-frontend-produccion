import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from '../models/horario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl = 'https://ssvs-backend-produccion-production.up.railway.app/api/horario';

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

  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getHorarioById(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }


  createHorario(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(this.apiUrl, horario, { headers: this.getAuthHeaders() });
  }

  updateHorario(horario: Horario): Observable<Horario> {
    return this.http.put<Horario>(`${this.apiUrl}/${horario.id}`, horario, { headers: this.getAuthHeaders() });
  }

  deleteHorario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getHorariosPorMedicoEspecialidad(medicoEspecialidadId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}/medico-especialidad/${medicoEspecialidadId}`, { headers: this.getAuthHeaders() });
}

}
