import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-esame-success',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  providers: [DatePipe],
  templateUrl: './esame-success.component.html',
  styleUrl: './esame-success.component.css'
})
export class EsameSuccessComponent 
{
  punteggio: string = '';
  userId: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
  isIssued: boolean = true;
  certificateKey: string = '';
  testDate: string = '';
  error: string = '';

  constructor(private dataService: DataService, private datePipe: DatePipe) {};

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
  
    // Richiamo il metodo getCoursesById per ottenere il nome del corso
    this.dataService.getCoursesById(this.idCorso).subscribe({
      next: (data: any) => {
        this.nomeCorso = data.courseName;
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });

    //genera il codice del certificato
    this.certificateKey = this.generaStringaLunga10();
    this.testDate = this.getCurrentDateString();
    this.isIssued = true;

    //richiamo del metodo inserimentoDatiCertificato
    this.dataService.createCertificate(this.userId, this.idCorso, this.isIssued, this.certificateKey, this.testDate).subscribe({
      next: () => {console.log("certificato creato con successo");},
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });
    localStorage.setItem('esameIniziato', 'false');
  }

  getCurrentDateString(): string 
  {
    const now = new Date();
    return this.datePipe.transform(now, 'dd-MM-yyyy') || ''; // Puoi cambiare il formato come preferisci
  }

  //metodo per generare la chiave del codice del certificato
  generaStringaLunga10(): string 
  {
    const caratteri = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = caratteri.length;
    for (let i = 0; i < 10; i++) 
    {
      const indice = Math.floor(Math.random() * charactersLength);
      result += caratteri.charAt(indice);
    }
    return result;
  }

}
