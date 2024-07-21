import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { LangTranslateModule } from '../../lang-translate/lang-translate.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, LangTranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword: boolean = false;
  currentLang: string = 'it';

  constructor(library: FaIconLibrary, private translate: TranslateService) {
    library.addIconPacks(fas);
    this.translate.addLangs(['it', 'en']);
    this.translate.setDefaultLang('it');
    this.translate.use(this.currentLang);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('.passInp') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
  }
}
