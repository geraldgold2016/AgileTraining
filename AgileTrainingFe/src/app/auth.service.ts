import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

// Definisci l'interfaccia per la risposta del login
export interface LoginResponse {
  token: string;
  message: string;
}

// Definisci l'interfaccia per l'errore
export interface LoginError {
  status: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://example.com/api/login';  // Sostituisci con l'URL della tua API

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password }).pipe(
      catchError(error => {
        // Gestisci l'errore come necessario
        return throwError(() => new Error('Login failed'));
      })
    );
  }
}
