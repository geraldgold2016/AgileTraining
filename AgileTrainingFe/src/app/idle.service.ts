import { Injectable } from '@angular/core';
import { Observable, timer, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private sessionTimeout = 1 * 60 * 60 * 1000; // 1 ora

  private warningTime = 1 * 60 * 1000; // 1 minuto

  private lastActivityTime = Date.now();
  private warningSubject = new Subject<number>();

  constructor(private router: Router) {
    // Avvia il timer di warning solo se non siamo sulla pagina di login
    this.startWarningTimer();
  }

  // Observable per il timeout della sessione
  getSessionTimeoutObservable(): Observable<void> {
    return new Observable(observer => {
      const checkSession = () => {
        if (this.router.url === '/login') {
          // Ignora la logica di inattività se siamo sulla pagina di login
          timer(1000).subscribe(checkSession);
          return;
        }

        if (Date.now() - this.lastActivityTime > this.sessionTimeout) {
          observer.next();
          observer.complete();
        } else {
          timer(1000).subscribe(checkSession);
        }
      };
      checkSession();
    });
  }

  // Observable per il countdown del warning
  getWarningObservable(): Observable<number> {
    return this.warningSubject.asObservable();
  }

  // Metodo per aggiornare l'ultimo tempo di attività dell'utente
  updateLastActivityTime() {
    this.lastActivityTime = Date.now();
  }

  // Metodo per avviare il timer di warning
  startWarningTimer() {
    timer(0, 1000).subscribe(() => {
      if (this.router.url === '/login') {
        // Ignora la logica di warning se siamo sulla pagina di login
        return;
      }

      const elapsed = Date.now() - this.lastActivityTime;
      const remainingTime = this.sessionTimeout - elapsed;
      if (remainingTime <= this.warningTime && remainingTime > 0) {
        this.warningSubject.next(Math.ceil((this.warningTime - (elapsed % this.warningTime)) / 1000));
      } else if (remainingTime <= 0) {
        this.warningSubject.complete();
      }
    });
  }

  // Metodo per resettare la sessione
  resetSession() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    location.href = '/login'; // Reindirizza alla pagina di login
  }
}
