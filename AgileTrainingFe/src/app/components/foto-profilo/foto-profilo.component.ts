import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foto-profilo',
  templateUrl: './foto-profilo.component.html',
  styleUrls: ['./foto-profilo.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FotoProfiloComponent implements OnInit {
  userId: number | null = null;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  profileImageUrl: string | null = null;
  private apiUrl = 'http://localhost:8080/image/upload';
  private profileUrl = 'http://localhost:8080/image/profile-picture/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Ottieni l'ID utente dal local storage
    const userId = localStorage.getItem('userId');
    this.userId = userId ? parseInt(userId, 10) : null;

    if (this.userId !== null) {
      this.getProfilePicture(); // Carica l'immagine del profilo esistente
    }
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

    this.http.post(`${this.apiUrl}/${this.userId}`, formData).subscribe({
      next: () => this.getProfilePicture(),  // Aggiorna l'immagine del profilo
      error: () => alert('Errore durante il caricamento dell\'immagine.')
    });
  }

  getProfilePicture() {
    if (this.userId === null) return;

    this.http.get(`${this.profileUrl}${this.userId}`, { responseType: 'text' }).subscribe({
      next: (response: string) => this.profileImageUrl = response,
      error: () => this.profileImageUrl = null
    });
  }
}
