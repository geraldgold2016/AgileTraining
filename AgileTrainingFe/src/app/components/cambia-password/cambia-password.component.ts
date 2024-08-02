import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cambia-password',
  templateUrl: './cambia-password.component.html',
  styleUrls: ['./cambia-password.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CambiaPasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';

  constructor(private userService: UserService, private router: Router) {}

  togglePasswordVisibility(id: string): void {
    const input = document.getElementById(id) as HTMLInputElement;
    const icon = document.querySelector(`#${id} + .eye-icon i`) as HTMLElement;

    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }

  onSubmit(): void {
    if (this.newPassword !== this.newPasswordConfirm) {
      alert('Le nuove password non corrispondono');
      return;
    }

    // Ottieni l'ID dell'utente dal localStorage
    const userId = localStorage.getItem('userId'); // Assicurati che 'userId' sia la chiave giusta

    if (!userId) {
      alert('Impossibile ottenere l\'ID dell\'utente');
      return;
    }

    this.userService.changePassword(Number(userId), this.oldPassword, this.newPassword).subscribe(
      response => {
        alert('Password cambiata con successo');
        this.router.navigate(['/profilo']); // Naviga al profilo utente o alla pagina desiderata
      },
      error => {
        alert('Errore durante il cambio della password: ' + error.error.message);
      }
    );
  }
}
