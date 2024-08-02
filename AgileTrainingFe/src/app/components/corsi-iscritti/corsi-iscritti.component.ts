import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-corsi-iscritti',
  standalone: true,
  imports: [FooterComponent,HeaderComponent],
  templateUrl: './corsi-iscritti.component.html',
  styleUrl: './corsi-iscritti.component.css'
})
export class CorsiIscrittiComponent {
  user: any = {};  // Oggetto per memorizzare i dati dell'utente

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const id = parseInt(localStorage.getItem('userId') || '0', 10);
    if (id) {
      this.userService.getUserById(id).subscribe({
        next: (data) => {
          this.user = data; // Memorizza i dati dell'utente
        },
        error: (err) => {
          console.error('Errore durante il recupero dei dati dell\'utente', err);
        }
      });
    }
  }
}
