import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cupo } from '../models/cupo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CupoService {
  private apiUrl = 'http://localhost:8080/api/cupo';

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

  getCuposPorHorario(horarioId: number): Observable<Cupo[]> {
    return this.http.get<Cupo[]>(`${this.apiUrl}/horario/${horarioId}`, { headers: this.getAuthHeaders() });
  }
}
