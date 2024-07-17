import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent 
{
  ngOnInit(): void 
  {
    const mostraAltro1 = document.querySelector("#MostraAltro1");
    const corsoIscritto = document.querySelectorAll<HTMLElement>(".corsoIscritto");

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
      console.error("il pulsante o gli elementi con classe corsoIscritto non ci sono");
    }

    const mostraAltro2 = document.querySelector("#MostraAltro2");
    const corsoInteressante = document.querySelectorAll<HTMLElement>(".corsoInteressante");

    if (mostraAltro2 && corsoInteressante.length > 0) 
    {
      mostraAltro2.addEventListener("click", () => {
        if (mostraAltro2.innerHTML == "Mostra Altro")
        {
          mostraAltro2.innerHTML = "Mostra meno";
        }
        else
        {
          mostraAltro2.innerHTML = "Mostra Altro"; //cambia il testo del pulsante
        }
        
        corsoInteressante.forEach(corsoInteressante => {
          corsoInteressante.classList.toggle('active');
        });
      });
    }
    else 
    {
      console.error("il pulsante o gli elementi con classe corsoInteressante non ci sono");
    }
  }
}
