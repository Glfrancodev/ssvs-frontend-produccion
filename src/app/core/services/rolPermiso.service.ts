import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permiso } from '../models/permiso';
import { AuthService } from './auth.service';
import { RolPermiso } from '../models/rolPermiso';

@Injectable({
  providedIn: 'root'
})
export class RolPermisoService {
  private apiUrl = 'http://localhost:8080/api/rol-permiso';

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

  getRolPermisos(): Observable<RolPermiso[]> {
    return this.http.get<RolPermiso[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getRolPermisoById(id: number): Observable<RolPermiso> {
    return this.http.get<RolPermiso>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createRolPermiso(rolpermiso: RolPermiso): Observable<RolPermiso> {
    return this.http.post<RolPermiso>(this.apiUrl, rolpermiso, { headers: this.getAuthHeaders() });
  }

  updateRolPermiso(rolpermiso: RolPermiso): Observable<RolPermiso> {
    return this.http.put<RolPermiso>(`${this.apiUrl}/${rolpermiso.id}`, rolpermiso, { headers: this.getAuthHeaders() });
  }

  deleteRolPermiso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
