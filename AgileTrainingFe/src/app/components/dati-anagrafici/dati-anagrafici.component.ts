import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dati-anagrafici',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './dati-anagrafici.component.html',
  styleUrls: ['./dati-anagrafici.component.css']
})
export class DatiAnagraficiComponent {
  constructor(private router: Router) {}

  handleMenuChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.router.navigate([selectedValue]);
  }
}
