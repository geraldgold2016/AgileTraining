import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LangTranslateModule } from '../../lang-translate/lang-translate.module';
import { IdleService } from '../../idle.service'; // Importa il servizio
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, LangTranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  showPassword = false;
  currentLang = 'it';
  loginRequest = { username: '', password: '' };
  errorMessage: string | null = null;
  isSubmitting = false;
  private sessionSubscription: Subscription | null = null;
  private warningSubscription: Subscription | null = null;

  // Regex come stringhe
  usernamePattern = '^[a-zA-Z0-9-_]+$';  // Consente lettere, numeri, trattini e underscore
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%&!])[A-Za-z\\d@#$%&!]{8,}$'; // Almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale

  constructor(
    private library: FaIconLibrary,
    private translate: TranslateService,
    private http: HttpClient,
    private router: Router,
    private idleService: IdleService // Inietta il servizio
  ) {
    library.addIconPacks(fas);
    this.translate.addLangs(['it', 'en']);
    this.translate.setDefaultLang('it');
    this.translate.use(this.currentLang);
  }

  ngOnInit() {
    this.sessionSubscription = this.idleService.getSessionTimeoutObservable().subscribe(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      this.router.navigate(['/login']);
    });

    this.warningSubscription = this.idleService.getWarningObservable().subscribe(() => {
      alert('La tua sessione sta per scadere. Effettua un\'azione per mantenerla attiva.');
    });

    // Aggiorna il tempo dell'ultima attività ogni volta che l'utente interagisce
    document.addEventListener('mousemove', () => this.idleService.updateLastActivityTime());
    document.addEventListener('keydown', () => this.idleService.updateLastActivityTime());
  }

  ngOnDestroy() {
    this.sessionSubscription?.unsubscribe();
    this.warningSubscription?.unsubscribe();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('.passInp') as HTMLInputElement;
    if (this.showPassword) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
}
