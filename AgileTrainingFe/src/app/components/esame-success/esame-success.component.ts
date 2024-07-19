import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-esame-success',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './esame-success.component.html',
  styleUrl: './esame-success.component.css'
})
export class EsameSuccessComponent {

}
