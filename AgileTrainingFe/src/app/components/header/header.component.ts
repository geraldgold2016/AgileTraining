import { Component } from '@angular/core';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent 
{
  ngOnInit(): void 
  {
    const navbar = document.querySelector<HTMLElement>(".navbar");
    const chiudi = document.querySelector<HTMLElement>(".chiudi");
    const input = document.querySelector<HTMLElement>(".input");
    const dropdown = document.querySelector<HTMLElement>(".dropdown");
    const divSemitrasparente = document.querySelector<HTMLElement>(".stratoSemiTrasparente");
    const hamburger = document.querySelector(".hamburger");
    const navItems = document.querySelectorAll<HTMLElement>(".navbar-item");

    if (hamburger && navItems.length > 0 && navbar && divSemitrasparente && chiudi && input && dropdown) 
    {
      hamburger.addEventListener("click", () => {
        divSemitrasparente.classList.toggle('active');
        navItems.forEach(navItem => {navItem.classList.toggle('active');});
        navbar.classList.toggle('active');
        chiudi.classList.toggle('active');
        input.classList.toggle('active');
        dropdown.classList.toggle('active');
        this.checkAndSwapItems(navbar);
      });

      chiudi.addEventListener("click", () => {
        divSemitrasparente.classList.toggle('active');
        navItems.forEach(navItem => {navItem.classList.toggle('active');});
        navbar.classList.toggle('active');
        chiudi.classList.toggle('active');
        input.classList.toggle('active');
        dropdown.classList.toggle('active');
        this.checkAndSwapItems(navbar);
      });

      divSemitrasparente.addEventListener("click", () => {
        divSemitrasparente.classList.toggle('active');
        navItems.forEach(navItem => {navItem.classList.toggle('active');});
        navbar.classList.toggle('active');
        chiudi.classList.toggle('active');
        input.classList.toggle('active');
        dropdown.classList.toggle('active');
        this.checkAndSwapItems(navbar);
      });
    }
    else 
    {
      console.error("Gli elementi 'navbar-item' o 'hamburger' o 'navbar' o 'stratoSemiTrasparente' non sono stati trovati");
    }
  }
  checkAndSwapItems(navbar: HTMLElement): void 
  {
    const ul = document.querySelector<HTMLElement>(".navbar ul");
    if (navbar && navbar.classList.contains('active')) //se l'elemento navbar contiene la classe active
    {
        if (ul) 
        {
          const items = ul.querySelectorAll<HTMLElement>("li");
    
          if (items.length >= 6) 
          {
            this.swapElements(items[3], items[1]);  // 4° elemento (indice 3) e 2° elemento (indice 1)
            this.swapElements(items[4], items[5]);  // 5° elemento (indice 4) e 6° elemento (indice 5)
          } 
          else 
          {
            console.error("Non ci sono abbastanza elementi nella lista.");
          }
        } 
        else 
        {
          console.error("Elemento <ul> non trovato.");
        }
    }
    else //se l'elemento navbar non contiene la classe active
    {
      if (ul) 
      {
        const items = ul.querySelectorAll<HTMLElement>("li");
  
        if (items.length >= 6) 
        {
          this.swapElements(items[1], items[3]);  // 2° elemento (indice 3) e 4° elemento (indice 1)
          this.swapElements(items[5], items[4]);  // 6° elemento (indice 4) e 5° elemento (indice 5)
        } 
        else 
        {
          console.error("Non ci sono abbastanza elementi nella lista.");
        }
      } 
      else 
      {
        console.error("Elemento <ul> non trovato.");
      }
    }
  }
  swapElements(arg0: HTMLElement, arg1: HTMLElement): void 
  {
    const parent = arg0.parentNode;

    if (parent) 
    {
      // Clona gli elementi per il swap
      const clone1 = arg0.cloneNode(true);
      const clone2 = arg1.cloneNode(true);
  
      // Rimuove gli elementi originali
      parent.replaceChild(clone2, arg0);
      parent.replaceChild(clone1, arg1);
    } 
    else 
    {
      console.error("Il genitore dell'elemento non è stato trovato.");
    }
  }

 
  
}
