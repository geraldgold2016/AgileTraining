import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { CommonModule, DatePipe } from '@angular/common'; 
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dati-anagrafici',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './dati-anagrafici.component.html',
  styleUrls: ['./dati-anagrafici.component.css'],
  providers: [DatePipe]
})
export class DatiAnagraficiComponent implements OnInit {
  user: any;

  constructor(
    private router: Router, 
    private userService: UserService, 
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const userId = this.getUserIdFromSession();
    console.log('User ID:', userId);

    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data) => {
          this.user = data;
          console.log('User data:', data);
        },
        (error) => {
          console.error('Errore nel recupero dei dati dell\'utente', error);
          alert('Impossibile recuperare i dati dell\'utente. Verifica che il token sia valido.');
          this.router.navigate(['/login']);
        }
      );
    } else {
      console.log('No user ID found, redirecting to login');
      this.router.navigate(['/login']);
    }
  }

  getUserIdFromSession(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
  

  handleMenuChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.router.navigate([selectedValue]);
  }
}
