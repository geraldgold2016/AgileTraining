import { Component } from '@angular/core';
import { ProfiloUtenteComponent } from '../profilo-utente/profilo-utente.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-certificati',
  standalone: true,
  imports: [ProfiloUtenteComponent,HeaderComponent,FooterComponent],
  templateUrl: './certificati.component.html',
  styleUrl: './certificati.component.css'
})
export class CertificatiComponent {

}
