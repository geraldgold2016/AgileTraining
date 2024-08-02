import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import Player from '@vimeo/player';

@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './corso.component.html',
  styleUrl: './corso.component.css'
})
export class CorsoComponent 
{
  @ViewChildren('vimeoPlayer') vimeoPlayers!: QueryList<ElementRef>;
  constructor(private dataService: DataService) {}  
  userId: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
  descrizioneCorso: string = '';
  capitoliCorso: any[] = [];
  descrizioneCapitoliCorso: any[] = [];
  rispostaIscrizioneCorso: string = '';
  certificatoEsiste: boolean = false;
  error: string = '';

  playerInstances: Player[] = [];

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
        //nel file html c'è capitolo.moduleName al posto di CapitoliCorso.moduleName
        //perchè all'inizio dell'accordion c'è il ciclo *ngFor = "let capitolo of CapitoliCorso"
        //quindi capitolo rappresenta una riga dell'array CapitoliCorso
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });

    //Richiamo il metodo checkCertificate per verificare l'esistenza del certificato
    this.dataService.checkCertificate(this.idCorso, this.userId).subscribe({
      next: (data: any) => {
        this.certificatoEsiste = data;
      },
      error: (err: any) => {
        console.error('Errore nel recupero esistenza certificato', err);
        this.error = 'Errore nel recupero esistenza certificato';
      }
    });
  }

  private examWindow: Window | null = null;

  openExamPage(event: Event) 
  {
    event.preventDefault(); // Previene il comportamento predefinito del link

    // Controlla se la finestra dell'esame è già aperta
    const isExamWindowOpen = localStorage.getItem('isExamWindowOpen') === 'true';

    if (isExamWindowOpen) 
    {
      alert("La pagina dell'esame è già aperta.");
      return;
    }
    // Apri una nuova finestra per l'esame
    this.examWindow = window.open('/introEsame', '_blank');

    if (!this.examWindow) 
    {
      alert("Impossibile aprire la pagina dell'esame. Per favore, abilita i popup nel tuo browser.");
    }

    // Salva l'informazione nel storage locale
    localStorage.setItem('isExamWindowOpen', 'true');

    // Aggiungi un listener per rimuovere l'informazione dallo storage locale quando la finestra è chiusa
    const interval = setInterval(() => {
      if (this.examWindow && this.examWindow.closed) 
      {
        clearInterval(interval);
        localStorage.removeItem('isExamWindowOpen');
      }
    }, 1000);
  }

  ngAfterViewInit(): void 
  {
    this.vimeoPlayers.forEach((playerElement, index) => {
      const iframe = playerElement.nativeElement;
      const player = new Player(iframe);

      let lastTime = 0;

      player.on('timeupdate', function(data) {
        if (data.seconds > lastTime) {
          player.setCurrentTime(lastTime);
        } else {
          lastTime = data.seconds;
        }
      });

      this.playerInstances[index] = player;
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
}