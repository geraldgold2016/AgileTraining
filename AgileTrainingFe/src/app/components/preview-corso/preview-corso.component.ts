import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-preview-corso',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './preview-corso.component.html',
  styleUrl: './preview-corso.component.css'
})
export class PreviewCorsoComponent 
{
  ngOnInit(): void 
  {
    var acc = document.querySelectorAll<HTMLElement>(".accordion");
    
    for (let i = 0; i < acc.length; i++) 
    {
      acc[i].addEventListener("click", function(this: HTMLElement) {
      this.classList.toggle("active");
      const panel = this.nextElementSibling as HTMLElement; //seleziona l'elemento prossimo più vicino
      if (panel.style.maxHeight != "") //se l'altezza massima del panel, sottoforma di stringa, non è vuota
      {
        panel.style.maxHeight = ""; //allora annulla l'altezza massima
      } 
      else 
      {
        panel.style.maxHeight = panel.scrollHeight + "px"; //altrimenti mi inserisci l'altezza massima
      } 
      
      const icona = this.children[0];
      toggleReplace(icona, 'fa-angle-down', 'fa-angle-up');
      });
    }
  }
}

// Funzione per togglare tra due classi
function toggleReplace(element: Element, class1: string, class2: string): void 
{
  if (element.classList.contains(class1)) 
  {
    element.classList.replace(class1, class2);
  } 
  else 
  {
    element.classList.replace(class2, class1);
  }
}