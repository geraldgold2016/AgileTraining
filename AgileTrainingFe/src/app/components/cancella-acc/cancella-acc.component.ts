import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-cancella-acc',
  standalone: true,
  imports: [FooterComponent,HeaderComponent],
  templateUrl: './cancella-acc.component.html',
  styleUrl: './cancella-acc.component.css'
})
export class CancellaAccComponent {

}
