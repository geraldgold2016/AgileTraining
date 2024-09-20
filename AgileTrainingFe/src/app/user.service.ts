import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  private userApiUrl = 'http://localhost:8080/users'; // URL per gli utenti
  private baseUrl = 'http://localhost:8080'; // Base URL del server

  constructor(private http: HttpClient) {}

// Metodo per cambiare la password
changePassword(id: number, oldPassword: string, newPassword: string): Observable<any> {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const body = { oldPassword, newPassword };

  // URL aggiornata per cambiare la password
  const url = `${this.baseUrl}/${id}/changePassword`;

  return this.http.put<any>(url, body, { headers });
}
 
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

  deleteUser(id: number, password: string): Observable<{ message: string }> {
    const url = `${this.baseUrl}/${id}/delete`;
    const params = new HttpParams().set('password', password);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      params: params
    };
    return this.http.delete<{ message: string }>(url, options);
  }
  


  updateUserData(id: number, updateRequest: { email?: string; profileImageUrl?: string; residentialAddress?: string; homeAddress?: string; gender?: string }): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.baseUrl}/${id}/update`;
    return this.http.put<any>(url, updateRequest, { headers });
  }





}
