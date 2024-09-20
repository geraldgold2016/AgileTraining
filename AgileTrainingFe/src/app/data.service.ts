import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

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
  getUtenteById(userId: string): Observable<any> 
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

  // Metodo per cercare i corsi per nome
  getCoursesByName(name: string): Observable<any[]> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/searchCourse/${name}`);
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

  //all'iscrizione del corso si inizializza il primo video del primo modulo
  inizializeVideoCourse(userId: string, courseId: string): Observable<any> 
  {
    const params = new HttpParams().set('userId', userId).set('courseId', courseId);
    return this.http.post<any>(`${this.baseUrl}/inizializeVideoCourse`, params);
  }

  //si ottiene l'activity dell'utente per corso
  getActivity(userId: string, courseId: string): Observable<any> 
  {
    const params = new HttpParams().set('userId', userId).set('courseId', courseId);
    return this.http.get<any>(`${this.baseUrl}/getActivity`, {params});
  }

  //aggiorna l'activity dell'utente
  updateActivityFineVideo(userId: string, courseId: string): Observable<any> 
  {
    const params = new HttpParams().set('userId', userId).set('courseId', courseId);
    return this.http.put<any>(`${this.baseUrl}/updateActivityFineVideo`,{}, {params});
  }

  //aggiorna l'activity dell'utente
  updateActivityVisioneVideo(userId: string, courseId: string, tempoVisione: string, percentuale: number): Observable<any> 
  {
    const body = {userId: userId, courseId: courseId, currentElapsedTime: tempoVisione,currentPercentage: percentuale};
    return this.http.put<any>(`${this.baseUrl}/updateActivityVisioneVideo`, body);
  }

  // Verifica se l'utente è iscritto a un corso specifico
  checkIscrizioneCorso(idCorso: string, idUtente: string): Observable<boolean> 
  {
    const params = new HttpParams().set('idCorso', idCorso).set('idUtente', idUtente);
    return this.http.get<boolean>(`${this.baseUrl}/checkIscrizioneCorso`, { params });
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

  // Inizia un nuovo test
  beginTest(testId: string, userId: string): Observable<any> 
  {
    const testRequest = { userId, testId };
    return this.http.post<any>(`${this.baseUrl}/beginTest`, testRequest);
  }

  //fine del test
  submitTest(testResult: string, testResultId: string): Observable<any> 
  {
    const submitRequest = {testResult, testResultId};
    return this.http.put<any>(`${this.baseUrl}/submitTest`, submitRequest);
  }

  //si ottiene l'id del test della colonna id della tabella tests 
  getTestIdByCourseId(courseId: string): Observable<any> 
  {
    return this.http.get<any[]>(`${this.baseUrl}/getTestId/${courseId}`);
  }

  //si ottiene il numero dei tentativi di un utente nel fare un esame di un corso
  getAttempts(testId: string, userId: string): Observable<any> 
  {
    const params = new HttpParams().set('testResultId', testId).set('userId', userId);
    return this.http.get<any>(`${this.baseUrl}/getAttempts`, { params });
  }
  
  //creo un nuovo certificato
  createCertificate(userId: string, courseId: string, isIssued: boolean, certificateKey: string, testDate: string): Observable<any> 
  {
    const certificate = {userId, courseId, isIssued, certificateKey, testDate}
    return this.http.post<any>(`${this.baseUrl}/createCertificate`, certificate);
  }

  //si ottiene le informazioni del certificato
  getCertificate(idCorso: string, idUtente: string): Observable<any> 
  {
    const params = new HttpParams().set('idCorso', idCorso).set('idUtente', idUtente);
    return this.http.get<any>(`${this.baseUrl}/getCertificate`, { params });
  }
  
  //si fa un check se il certificato esiste
  checkCertificate(idCorso: string, idUtente: string): Observable<any> 
  {
    const params = new HttpParams().set('idCorso', idCorso).set('idUtente', idUtente);
    return this.http.get<any>(`${this.baseUrl}/checkCertificate`, { params });
  }

}
