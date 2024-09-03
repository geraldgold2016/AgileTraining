import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-avviso-iscrizione-corso-annullato',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './avviso-iscrizione-corso-annullato.component.html',
  styleUrl: './avviso-iscrizione-corso-annullato.component.css'
})
export class AvvisoIscrizioneCorsoAnnullatoComponent 
{
  constructor(private dataService: DataService) {}  
  userId: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
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
        this.nomeCorso = data.courseName;
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });
  }
}
