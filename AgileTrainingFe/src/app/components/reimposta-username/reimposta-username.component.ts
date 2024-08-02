import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service'; // Assicurati che il percorso sia corretto
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa il router per la navigazione

@Component({
  selector: 'app-reimposta-username',
  templateUrl: './reimposta-username.component.html',
  styleUrls: ['./reimposta-username.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ReimpostaUsernameComponent implements OnInit {
  newUsername: string = '';
  password: string = '';
  userId: number = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const userIdStr = localStorage.getItem('userId');
    if (userIdStr !== null) {
      this.userId = +userIdStr;
    } else {
      console.error('User ID non trovato');
    }
  }

  reimpostaUsername(): void {
    console.log('Attempting to update username with:', this.newUsername, this.password);

    const updateRequest = {
      username: this.newUsername,
      password: this.password,
    };

    this.userService.updateUser(this.userId, updateRequest).subscribe({
      next: (response) => {
        this.successMessage = response.message; // Supponendo che il backend ritorni un messaggio
        this.errorMessage = ''; // Resetta eventuali messaggi di errore
        this.router.navigate(['/avvisoPass']); // Reindirizza l'utente alla pagina del profilo
      },
      error: (error) => {
        console.error('Errore durante l\'aggiornamento:', error);
        this.errorMessage = 'Errore durante l\'aggiornamento: ' + error.message; // Mostra il messaggio di errore
        this.successMessage = ''; // Resetta eventuali messaggi di successo
      }
    });
  }

  passFun(): void {
    const passwordField = document.getElementById("passInp") as HTMLInputElement;

    if (passwordField) {
      passwordField.type = passwordField.type === "password" ? "text" : "password";
    }
  }
}
