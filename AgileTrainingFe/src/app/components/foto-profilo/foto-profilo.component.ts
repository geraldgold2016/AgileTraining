import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { catchError, throwError, finalize } from 'rxjs';

@Component({
  selector: 'app-foto-profilo',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './foto-profilo.component.html',
  styleUrls: ['./foto-profilo.component.css']
})
export class FotoProfiloComponent implements OnInit {
  user: any = {}; // Oggetto per memorizzare i dati dell'utente
  userId: number | null = null;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  profileImageUrl: string | null = null;
  isLoading: boolean = false; // Variabile di stato per il loader
  private apiUrl = 'http://localhost:8080/image/upload';
  private profileUrl = 'http://localhost:8080/image/profile-picture/';

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromSession();
    console.log('User ID:', this.userId);

    if (this.userId !== null) {
      this.userService.getUserById(this.userId).pipe(
        catchError(error => {
          console.error('Errore nel recupero dei dati dell\'utente', error);
          alert('Impossibile recuperare i dati dell\'utente. Verifica che il token sia valido.');
          this.router.navigate(['/login']);
          return throwError(() => error);
        })
      ).subscribe(data => {
        this.user = data;
        console.log('User data:', data);
        this.getProfilePicture(); // Ottieni l'immagine del profilo subito dopo aver caricato i dati dell'utente
      });
    } else {
      console.log('No user ID found, redirecting to login');
      this.router.navigate(['/login']);
    }
  }

  getUserIdFromSession(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Crea un URL per la visualizzazione dell'anteprima
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.previewUrl = null;
    }
  }

  uploadImage() {
    if (this.userId === null || this.selectedFile === null) {
      alert('ID utente o file non valido!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.isLoading = true; // Mostra il loader

    this.http.post(`${this.apiUrl}/${this.userId}`, formData).pipe(
      finalize(() => this.isLoading = false), // Nascondi il loader al termine della richiesta
      catchError(error => {
        console.error('Errore durante il caricamento dell\'immagine:', error);
        alert('Errore durante il caricamento dell\'immagine. Riprova più tardi.');
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.getProfilePicture(); // Aggiorna l'immagine del profilo
      setTimeout(() => {
        window.location.reload(); // Ricarica la pagina dopo 3 secondi
      }, 3000);
    });
  }

  getProfilePicture() {
    if (this.userId === null) return;

    this.http.get(`${this.profileUrl}${this.userId}`, { responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Errore nel recupero dell\'immagine del profilo:', error);
        this.profileImageUrl = null;
        return throwError(() => error);
      })
    ).subscribe((response: string) => {
      this.profileImageUrl = response;
    });
  }

  onMenuChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const url = target.value;
    if (url) {
      this.router.navigate([url]);
    }
  }
}
