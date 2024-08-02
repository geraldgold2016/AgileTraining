import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from '../../header.service';
import { CommonModule } from '@angular/common';
import { LangTranslateModule } from '../../lang-translate/lang-translate.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LangTranslateModule, FormsModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  switchLang: string = 'it';
  isDarkMode: boolean = false;
  showSidebar: boolean = false;
  showSearchBox: boolean = false;
  dropdownOpen: boolean = false; // Aggiungi questa proprietà

  constructor(
    private _header: HeaderService,
    private router: Router,
    public translate: TranslateService,
    private renderer: Renderer2
  ) {
    translate.addLangs(['it', 'en']);
    translate.setDefaultLang('it');
  }

  ngOnInit(): void {
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark-mode') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    }

    this._header.selectedlang.subscribe(lang => {
      this.switchLang = lang;
      this.translate.use(this.switchLang);
    });

    this.renderer.listen('window', 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (this.showSidebar && !target.closest('.menu') && !target.closest('.sidebarOpen') && !target.closest('.siderbarClose')) {
        this.closeSidebar();
      }
    });
  }

  selectedLanguage(lang: string): void {
    this._header.setLang(lang);
    this.switchLang = lang;
    this.translate.use(lang);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  
    // Gestisci la visibilità delle icone
    const logoChiaro = document.querySelector('.logoChiaro') as HTMLElement;
    const logoNormale = document.querySelector('.logoNormale') as HTMLElement;
    const luna = document.querySelector('.bx-moon') as HTMLElement;
    const sole = document.querySelector('.bx-sun') as HTMLElement;
  
    if (logoChiaro && logoNormale && luna && sole) {
      logoChiaro.style.display = this.isDarkMode ? 'block' : 'none';
      logoNormale.style.display = this.isDarkMode ? 'none' : 'block';
      luna.style.display = this.isDarkMode ? 'none' : 'block';
      sole.style.display = this.isDarkMode ? 'block' : 'none';
    }
  
    localStorage.setItem('mode', this.isDarkMode ? 'dark-mode' : 'light-mode');
  }
  
  

  toggleSearchBox(): void {
    this.showSearchBox = !this.showSearchBox;
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;

    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.menu-overlay');
    const sidebarOpenIcon = document.querySelector('.sidebarOpen');
    const sidebarCloseIcon = document.querySelector('.siderbarClose');
    const logoImg = document.querySelector('.navLogo img');

    if (menu && overlay && sidebarOpenIcon && sidebarCloseIcon && logoImg) {
      menu.classList.toggle('active', this.showSidebar);
      overlay.classList.toggle('active', this.showSidebar);
      sidebarOpenIcon.classList.toggle('d-none', this.showSidebar);
      sidebarCloseIcon.classList.toggle('d-none', !this.showSidebar);
      if (this.showSidebar) {
        logoImg.classList.add('d-none');
      } else {
        logoImg.classList.remove('d-none');
      }
    }
  }

  closeSidebar(): void {
    this.showSidebar = false;
    document.querySelector('.menu-overlay')?.classList.remove('active');
    document.querySelector('.menu')?.classList.remove('active');
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
