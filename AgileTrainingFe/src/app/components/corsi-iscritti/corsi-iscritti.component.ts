import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-corsi-iscritti',
  standalone: true,
  imports: [FooterComponent,HeaderComponent],
  templateUrl: './corsi-iscritti.component.html',
  styleUrl: './corsi-iscritti.component.css'
})
export class CorsiIscrittiComponent {

}
