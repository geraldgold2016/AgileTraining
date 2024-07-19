import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dati-utente',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './dati-utente.component.html',
  styleUrl: './dati-utente.component.css'
})
export class DatiUtenteComponent {

}
