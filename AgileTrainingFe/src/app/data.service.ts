import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class DataService 
{
  private baseUrl = 'http://localhost:8080';

  private questionsCache: any[] = [];

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

  //l'utente si iscrive ad un corso
  subscribeToCourse(userId: string, courseId: string): Observable<any> 
  {
    const subscribeData = { userId, courseId };
    return this.http.post<any>(`${this.baseUrl}/subscribeToCourse`, subscribeData);
  }

  //l'utente annulla l'iscrizione ad un corso
  unsubscribeToCourse(userId: string, courseId: string): Observable<any> 
  {
    const unsubscribeData = { userId, courseId };
    return this.http.delete<any>(`${this.baseUrl}/unsubscribeFromCourse`, {body: unsubscribeData});
  }

  //si ottengono tutte le domande del test dall'id del corso
  getQuestionByCourseId(courseId: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/${courseId}/getQuestions`);
  }

  //si ottiene 1 domanda dal suo id
  getQuestionById(domandaId: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/${domandaId}/getQuestion`);
  }

  //si ottengono tutte le possibili risposte dall'id di una domanda
  getOptionsByIdQuestion(questionId: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/${questionId}/getOptions`);
  }

  //creazione nuovo Test
  beginTest(userId: string, testId: string): Observable<any> 
  {
    const testRequest = {userId, testId};
    return this.http.post<any>(`${this.baseUrl}/beginTest`, testRequest);
  }  

  //fine del test
  submitTest(testResult: string, testResultId: string): Observable<any> 
  {
    const submitRequest = {testResult, testResultId};
    return this.http.post<any>(`${this.baseUrl}/submitTest`, submitRequest);
  }

  getTestIdByCourseId(courseId: string): Observable<any> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/getTestId/${courseId}`);
  }

  //prendi l'id dell'ultimo test di un user di un test
  getLatestTestResultId(userId: string, testId: string): Observable<number> 
  {
    return this.http.get<number>(`${this.baseUrl}/latestId/${userId}/${testId}`);
  }
}
