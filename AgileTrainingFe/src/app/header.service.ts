import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // Usa BehaviorSubject per poter chiamare next()
  private langSubject = new BehaviorSubject<string>('it'); // Imposta una lingua di default

  selectedlang = this.langSubject.asObservable();

  // Metodo per aggiornare la lingua
  setLang(lang: string): void {
    this.langSubject.next(lang);
  }
}
