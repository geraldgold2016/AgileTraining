import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-corso',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './preview-corso.component.html',
  styleUrl: './preview-corso.component.css'
})
export class PreviewCorsoComponent 
{
  constructor(private dataService: DataService) {}  
  userId: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
  descrizioneCorso: string = '';
  capitoliCorso: any[] = [];
  durataTotaleVideoCorso: number = 0;
  oreTotaliVideoCorso: number = 0;
  minutiTotaliVideoCorso: number = 0;
  esameCorso: any = '';
  descrizioneCapitoliCorso: any[] = [];
  rispostaIscrizioneCorso: string = '';
  error: string = '';

  ngOnInit(): void 
  {
    //ottengo l'idUtente e il Token dal Local Storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId != null) {this.userId = storedUserId;} 
    else {this.userId = 'idUtente non trovato';}
    // console.log('User ID:',storedUserId);    

    //ottengo l'idCorso dal Local Storage
    const storedCorsoId = localStorage.getItem('selectedCourseId');
    if (storedCorsoId != null) {this.idCorso = storedCorsoId;} 
    else {this.idCorso = 'idCorso non trovato';}
    // console.log('Corso ID:',storedCorsoId);   

    //Richiamo il metodo getCoursesById per ottenere la descrizione del corso
    this.dataService.getCoursesById(this.idCorso).subscribe({
      next: (data: any) => {
        this.descrizioneCorso = data.courseDescription;
        this.nomeCorso = data.courseName;
        this.durataTotaleVideoCorso = data.duration;

        //Calcolo Durata ore e minuti
        this.oreTotaliVideoCorso = Math.floor(this.durataTotaleVideoCorso/60);
        this.minutiTotaliVideoCorso = this.durataTotaleVideoCorso % 60;
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });

    //Richiamo il metodo getChaptersByIdCourse per ottenere tutti i capitoli del corso
    this.dataService.getChaptersByIdCourse(this.idCorso).subscribe({
      next: (data: any[]) => {
        for(var i = 0; i < data.length - 1; i++)  //prendi tutto tranne l'ultimo elemento dell'array
        {
          this.capitoliCorso[i] = data[i];  
        }
        this.esameCorso = data[data.length -1]; //prendi l'ultimo elemento dell'array
        //nel file html c'è capitolo.moduleName al posto di CapitoliCorso.moduleName
        //perchè all'inizio dell'accordion c'è il ciclo *ngFor = "let capitolo of CapitoliCorso"
        //quindi capitolo rappresenta una riga dell'array CapitoliCorso
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });



  }

  //funzione per vedere il capitolo
  toggleAccordion(event: any): void 
  {
    const element = event.target as HTMLElement;
    const accordion = element.closest('.accordion');
    if (accordion) 
    {
      accordion.classList.toggle("active");
      const panel = accordion.nextElementSibling as HTMLElement;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = "";
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
      const icon = accordion.querySelector('.fa-angle-down');
      if (icon) {
        icon.classList.toggle('rotated');
      }
    }
  }

  //Iscrizione al Corso
  Iscrizione()
  {
    this.dataService.subscribeToCourse(this.userId, this.idCorso).subscribe({
      next: () => {
        this.rispostaIscrizioneCorso = 'Iscrizione avvenuta con successo!';
      },
      error: (err: any) => {
        this.error = 'Errore durante il login';
        console.error('Errore:', err);
      }
    });
  }
}