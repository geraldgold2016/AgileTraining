import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service'; // Assicurati che il percorso sia corretto
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  userName: string = '';
  user: any = {};  // Oggetto per memorizzare i dati dell'utente

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
 
   
  }

  loadUserData(): void {
    const userId = this.getUserIdFromSession();
    if (userId) 
    {
      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = data; // Memorizza i dati dell'utente
          this.userName = `${data.name} ${data.surname}`;
        },
        error: (error) => {
          console.error('Errore durante il recupero dei dati dell\'utente', error);
          alert('Impossibile recuperare i dati dell\'utente. Verifica che il token sia valido.');
          this.router.navigate(['/login']);
        }
      });
    } else {
      console.log('No user ID found, redirecting to login');
      this.router.navigate(['/login']);
    }
  }

  private getUserIdFromSession(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

 


}
