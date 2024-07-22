import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { LangTranslateModule } from '../../lang-translate/lang-translate.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, LangTranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword: boolean = false;
  currentLang: string = 'it';
  loginRequest = { username: '', password: '' };
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(
    library: FaIconLibrary,
    private translate: TranslateService,
    private http: HttpClient,
    private router: Router
  ) {
    library.addIconPacks(fas);
    this.translate.addLangs(['it', 'en']);
    this.translate.setDefaultLang('it');
    this.translate.use(this.currentLang);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  onSubmit() {
    this.errorMessage = null;
    this.isSubmitting = true;

    this.http.post<any>('http://localhost:8080/login', this.loginRequest).subscribe(
      response => {
        console.log('Login successful', response);
        this.router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => {
        console.error('Login failed', error);
        this.errorMessage = error.error?.message || 'Nome utente o password non corretti.';
        this.isSubmitting = false;
      }
    );
  }
}
