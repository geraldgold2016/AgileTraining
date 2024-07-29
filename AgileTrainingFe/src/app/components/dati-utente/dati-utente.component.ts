import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dati-utente',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './dati-utente.component.html',
  styleUrls: ['./dati-utente.component.css']
})
export class DatiUtenteComponent implements OnInit {
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
