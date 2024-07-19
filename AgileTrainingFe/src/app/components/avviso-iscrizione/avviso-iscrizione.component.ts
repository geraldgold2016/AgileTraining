import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-avviso-iscrizione',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './avviso-iscrizione.component.html',
  styleUrl: './avviso-iscrizione.component.css'
})
export class AvvisoIscrizioneComponent {

}
