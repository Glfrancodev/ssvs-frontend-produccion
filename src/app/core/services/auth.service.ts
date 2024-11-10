// src/app/core/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = 'http://localhost:8080/authenticate';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  // Método de login con almacenamiento del token
  login(correo: string, contrasena: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, { correo, contrasena }).pipe(
      tap(response => {
        if (response.jwt) {
          console.log(response.jwt);
          this.setToken(response.jwt);
        }
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para obtener el rol del usuario desde el token decodificado
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role || null;
    console.log("Extracted role:", role); // <--- Esto mostrará el rol en la consola
    return role;
  }
  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Tiempo de expiración en milisegundos
    return Date.now() < exp;
  }

  // Método de logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Método para obtener el correo del usuario desde el token decodificado
  getAuthenticatedUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.sub || null; // 'sub' es comúnmente el correo o nombre de usuario en el token
    console.log("Authenticated user email:", email);
    return email;
  }

}
