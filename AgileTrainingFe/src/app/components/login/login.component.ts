import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
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
  showPassword: boolean = false;
  currentLang: string = 'it';
  loginRequest = { username: '', password: '' };
  errorMessage: string | null = null;
  isSubmitting = false;
  private sessionSubscription!: Subscription;
  private warningSubscription!: Subscription;

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
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
    if (this.warningSubscription) {
      this.warningSubscription.unsubscribe();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  onSubmit() {
    if (!this.loginRequest.username || !this.loginRequest.password) {
      this.errorMessage = 'Please fill in both fields.';
      return;
    }
  
    this.errorMessage = null;
    this.isSubmitting = true;
  
    this.http.post<any>('http://localhost:8080/login', this.loginRequest).subscribe(
      response => {
        console.log('Login successful', response);
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        } else {
          console.warn('Token not found in response');
        }
  
        if (response.userId && !isNaN(Number(response.userId))) {
          localStorage.setItem('userId', Number(response.userId).toString());
        } else {
          console.warn('User ID not found or invalid in response');
        }
  
        this.router.navigate(['/datiAnagrafici']); // Redirigi alla pagina dei dati anagrafici
      },
      (error: HttpErrorResponse) => {
        console.error('Login failed', error);
        this.errorMessage = error.error?.message || 'Nome utente o password non corretti.';
        this.isSubmitting = false;
      }
    );
  }

  removeSpaces(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\s+/g, ''); // Rimuove tutti gli spazi
  }

  validateUsername(event: Event) {
    const input = event.target as HTMLInputElement;
    const pattern = new RegExp(this.usernamePattern);
    if (!pattern.test(input.value)) {
      input.value = input.value.replace(/[^a-zA-Z0-9-_]/g, ''); // Rimuove i caratteri non accettabili
    }
  }

  validatePassword(event: Event) {
    const input = event.target as HTMLInputElement;
    const pattern = new RegExp(this.passwordPattern);
    if (!pattern.test(input.value)) {
      input.value = input.value.replace(/[^a-zA-Z0-9@#$%&!]/g, ''); // Rimuove i caratteri non accettabili
    }
  }

  @HostListener('document:copy', ['$event'])
  onCopy(event: ClipboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('input') && (target as HTMLInputElement).type !== 'password') {
      event.preventDefault();
    }
  }
}
