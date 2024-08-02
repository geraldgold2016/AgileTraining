import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-esame-failed',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './esame-failed.component.html',
  styleUrl: './esame-failed.component.css'
})
export class EsameFailedComponent implements OnInit
{
  punteggio: string = '';
  userId: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
  error: string = '';

  constructor(private dataService: DataService) {};

  ngOnInit(): void 
  {
    const punteggio= localStorage.getItem('punteggio');
    if (punteggio)
    {
      this.punteggio = punteggio;
    }

    // Ottengo l'idUtente e il Token dal Local Storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId != null) {
      this.userId = storedUserId;
    } else {
      this.userId = 'idUtente non trovato';
    }

    // Ottengo l'idCorso dal Local Storage
    const storedCorsoId = localStorage.getItem('selectedCourseId');
    if (storedCorsoId != null) {
      this.idCorso = storedCorsoId;
    } else {
      this.idCorso = 'idCorso non trovato';
    }

    // Richiamo il metodo getCoursesById per ottenere la descrizione del corso
    this.dataService.getCoursesById(this.idCorso).subscribe({
      next: (data: any) => {
        this.nomeCorso = data.courseName;
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });

    localStorage.setItem('esameIniziato', 'false');
  }
}
