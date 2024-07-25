import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class DataService 
{
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Login dell'utente
  login(username: string, password: string): Observable<any> 
  {
    const loginData = { username, password };
    return this.http.post<any>(`${this.baseUrl}/login`, loginData);
  }

  // Ottenere i dati dell'utente per ID
  getUtenteId(userId: string): Observable<any> 
  {
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }

  //si ottengono tutti i corsi che può offrire il sito
  getAllCourses(): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/allCourses`);
  }

  //si ottengono tutti i corsi che può offrire il sito
  getCoursesByCategory(category: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/${category}/Courses`);
  }

  //si ottengono tutti i corsi a cui l'utente è iscritto
  getCoursesSubscriptions(userId: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}/subscriptions`);
  }

  //si ottengono tutti i corsi a cui l'utente non è iscritto
  getMoreCourses(userId: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}/coursesAvailable`);
  }

  //si ottengono il nome e la descrizione di un corso con il suo id
  getCoursesById(courseId: string): Observable<any> 
  {
    return this.http.get<any>(`${this.baseUrl}/${courseId}/Course`);
  }

  //si ottengono il nome e la descrizione di un corso con il suo id
  getChaptersByIdCourse(courseId: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/${courseId}/allModules`);
  }

}
