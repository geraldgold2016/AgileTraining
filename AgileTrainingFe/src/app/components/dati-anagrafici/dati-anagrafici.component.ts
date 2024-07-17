import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dati-anagrafici',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './dati-anagrafici.component.html',
  styleUrl: './dati-anagrafici.component.css'
})
export class DatiAnagraficiComponent {

}
