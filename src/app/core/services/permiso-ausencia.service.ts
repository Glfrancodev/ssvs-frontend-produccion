import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermisoAusencia } from '../models/permisoAusencia';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermisoAusenciaService {
  private apiUrl = 'http://localhost:8080/api/permiso-ausencia';

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

  getPermisosAusencia(): Observable<PermisoAusencia[]> {
    return this.http.get<PermisoAusencia[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createPermisoAusencia(permiso: PermisoAusencia): Observable<PermisoAusencia> {
    return this.http.post<PermisoAusencia>(this.apiUrl, permiso, { headers: this.getAuthHeaders() });
  }

  updatePermisoAusencia(permiso: PermisoAusencia): Observable<PermisoAusencia> {
    return this.http.put<PermisoAusencia>(`${this.apiUrl}/${permiso.id}`, permiso, { headers: this.getAuthHeaders() });
  }

  deletePermisoAusencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
