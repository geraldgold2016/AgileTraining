import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancella-account',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cancella-account.component.html',
  styleUrls: ['./cancella-account.component.css']
})
export class CancellaAccountComponent implements OnInit {
  user: any ;

  
  private userId: number | null = null;
  password: string = '';
  message: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {


    // Leggi l'ID utente dal localStorage
    const id = localStorage.getItem('userId');
    this.userId = id ? +id : null;

    // Se l'ID non è trovato, redirigi all'accesso
    if (this.userId === null) {
      console.log('No user ID found, redirecting to login');
      this.router.navigate(['/login']);
    }

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

  deleteAccount() {
    if (this.userId === null || this.password === '') {
      this.message = 'Per favore inserisci una password.';
      return;
    }

    this.userService.deleteUser(this.userId, this.password).subscribe({
      next: (response) => {
        this.message = response.message;
        // Mostra il popup di conferma
        setTimeout(() => {
          alert('Il tuo account è stato eliminato con successo.');
          // Rimuovi l'ID dal localStorage e redirigi alla pagina di login
          localStorage.removeItem('userId');
          this.router.navigate(['/login']);
        }, 500);
      },
      error: (err: HttpErrorResponse) => {
        this.message = 'Errore durante l\'eliminazione dell\'account. Controlla la password inserita.';
        console.error('Errore:', err);
      }
    });
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
