import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from '../../header.service';
import { CommonModule } from '@angular/common';
import { LangTranslateModule } from '../../lang-translate/lang-translate.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LangTranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  switchLang: string = 'it';

  constructor(
    private _header: HeaderService, 
    private router: Router, 
    public translate: TranslateService
  ) {
    // Aggiungi lingue supportate e imposta la lingua predefinita
    translate.addLangs(['it', 'en']);
    translate.setDefaultLang('it'); // Imposta la lingua predefinita

    this._header.selectedlang.subscribe(lang => {
      this.switchLang = lang;
      this.translate.use(this.switchLang); // Usa la lingua selezionata
    });
  }

  ngOnInit(): void {
    this.initializeNavbar();
  }

  initializeNavbar(): void {
    const navbar = document.querySelector<HTMLElement>('.navbar');
    const chiudi = document.querySelector<HTMLElement>('.chiudi');
    const input = document.querySelector<HTMLElement>('.input');
    const dropdown = document.querySelector<HTMLElement>('.dropdown');
    const divSemitrasparente = document.querySelector<HTMLElement>('.stratoSemiTrasparente');
    const hamburger = document.querySelector<HTMLElement>('.hamburger');
    const navItems = document.querySelectorAll<HTMLElement>('.navbar-item');

    if (
      hamburger &&
      navItems.length > 0 &&
      navbar &&
      divSemitrasparente &&
      chiudi &&
      input &&
      dropdown
    ) {
      hamburger.addEventListener('click', () => {
        this.toggleNavbarState(navbar, chiudi, input, dropdown, divSemitrasparente, navItems);
      });

      chiudi.addEventListener('click', () => {
        this.toggleNavbarState(navbar, chiudi, input, dropdown, divSemitrasparente, navItems);
      });

      divSemitrasparente.addEventListener('click', () => {
        this.toggleNavbarState(navbar, chiudi, input, dropdown, divSemitrasparente, navItems);
      });
    } else {
      console.error(
        "Gli elementi 'navbar-item' o 'hamburger' o 'navbar' o 'stratoSemiTrasparente' non sono stati trovati"
      );
    }
  }

  toggleNavbarState(navbar: HTMLElement, chiudi: HTMLElement, input: HTMLElement, dropdown: HTMLElement, divSemitrasparente: HTMLElement, navItems: NodeListOf<HTMLElement>): void {
    divSemitrasparente.classList.toggle('active');
    navItems.forEach(navItem => {
      navItem.classList.toggle('active');
    });
    navbar.classList.toggle('active');
    chiudi.classList.toggle('active');
    input.classList.toggle('active');
    dropdown.classList.toggle('active');
    this.checkAndSwapItems(navbar);
  }

  checkAndSwapItems(navbar: HTMLElement): void {
    const ul = document.querySelector<HTMLElement>('.navbar ul');
    if (navbar && navbar.classList.contains('active')) {
      if (ul) {
        const items = ul.querySelectorAll<HTMLElement>('li');

        if (items.length >= 6) {
          this.swapElements(items[3], items[1]); // 4° elemento (indice 3) e 2° elemento (indice 1)
          this.swapElements(items[4], items[5]); // 5° elemento (indice 4) e 6° elemento (indice 5)
        } else {
          console.error('Non ci sono abbastanza elementi nella lista.');
        }
      } else {
        console.error('Elemento <ul> non trovato.');
      }
    } else {
      if (ul) {
        const items = ul.querySelectorAll<HTMLElement>('li');

        if (items.length >= 6) {
          this.swapElements(items[1], items[3]); // 2° elemento (indice 1) e 4° elemento (indice 3)
          this.swapElements(items[5], items[4]); // 6° elemento (indice 5) e 5° elemento (indice 4)
        } else {
          console.error('Non ci sono abbastanza elementi nella lista.');
        }
      } else {
        console.error('Elemento <ul> non trovato.');
      }
    }
  }

  swapElements(element1: HTMLElement, element2: HTMLElement): void {
    const parent = element1.parentNode;

    if (parent) {
      const nextSibling1 = element1.nextSibling;
      const nextSibling2 = element2.nextSibling;

      parent.insertBefore(element2, element1);
      parent.insertBefore(element1, nextSibling2);
    } else {
      console.error("Il genitore dell'elemento non è stato trovato.");
    }
  }

  selectedLanguage(lang: string): void {
    this._header.setLang(lang); // Usa il metodo setLang per aggiornare la lingua
  }
}
