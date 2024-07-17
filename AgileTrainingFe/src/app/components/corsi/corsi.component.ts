import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-corsi',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './corsi.component.html',
  styleUrl: './corsi.component.css'
})
export class CorsiComponent 
{
  ngOnInit(): void 
  {
    const mostraAltro1 = document.querySelector("#MostraAltro");
    const corsoIscritto = document.querySelectorAll<HTMLElement>(".corso");

    if (mostraAltro1 && corsoIscritto.length > 0) 
    {
      mostraAltro1.addEventListener("click", () => {
        if (mostraAltro1.innerHTML == "Mostra Altro")
        {
          mostraAltro1.innerHTML = "Mostra meno";
        }
        else
        {
          mostraAltro1.innerHTML = "Mostra Altro"; //cambia il testo del pulsante
        }
        
        corsoIscritto.forEach(corsoIscritto => {
          corsoIscritto.classList.toggle('active');
        });
      });
    }
    else 
    {
      console.error("il pulsante o gli elementi con classe corso non ci sono");
    }
  }
}
