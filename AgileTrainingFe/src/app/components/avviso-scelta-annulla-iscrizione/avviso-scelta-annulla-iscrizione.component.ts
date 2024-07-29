import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-avviso-scelta-annulla-iscrizione',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './avviso-scelta-annulla-iscrizione.component.html',
  styleUrl: './avviso-scelta-annulla-iscrizione.component.css'
})
export class AvvisoSceltaAnnullaIscrizioneComponent {
  constructor(private dataService: DataService) { }
  userId: string = '';
  idCorso: string = '';
  rispostaIscrizioneCorso: string = '';
  error: string = '';

  ngOnInit(): void 
  {
    //ottengo l'idUtente e il Token dal Local Storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId != null) { this.userId = storedUserId; }
    else { this.userId = 'idUtente non trovato'; }
    // console.log('User ID:',storedUserId);    

    //ottengo l'idCorso dal Local Storage
    const storedCorsoId = localStorage.getItem('selectedCourseId');
    if (storedCorsoId != null) { this.idCorso = storedCorsoId; }
    else { this.idCorso = 'idCorso non trovato'; }
  }
  //Annulla Iscrizione al Corso
  AnnullaIscrizione() 
  {
    this.dataService.unsubscribeToCourse(this.userId, this.idCorso).subscribe({
      next: () => {
        this.rispostaIscrizioneCorso = 'Annullamento iscrizione avvenuta con successo!';
        console.log(this.rispostaIscrizioneCorso);
      },
      error: (err: any) => {
        this.error = 'Errore durante il login';
        console.error('Errore:', err);
      }
    });
  }
}
