import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FotoProfiloComponent } from '../foto-profilo/foto-profilo.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-esame-failed',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './esame-failed.component.html',
  styleUrl: './esame-failed.component.css'
})
export class EsameFailedComponent {

}
