import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
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
