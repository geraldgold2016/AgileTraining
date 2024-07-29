import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApiUrl = 'http://localhost:8080/users'; // URL per gli utenti
  private imageApiUrl = 'http://localhost:8080/image'; // URL per le immagini

  constructor(private http: HttpClient) {}

  // Carica la foto del profilo
  
 

 

  // Ottieni i dati utente per ID
  getUserById(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.userApiUrl}/${id}`, { headers });
  }

  // Aggiorna l'utente per ID (username e/o password)
  updateUser(id: number, updateRequest: { username?: string; password?: string }): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.userApiUrl}/${id}/updateUsername`; // URL per aggiornare l'username
    return this.http.put<any>(url, updateRequest, { headers });
  }
}
