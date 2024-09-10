import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, ViewChild, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import Player from '@vimeo/player';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './corso.component.html',
  styleUrl: './corso.component.css'
})
export class CorsoComponent 
{
  constructor(private dataService: DataService, private sanitizer: DomSanitizer) {} 

  userId: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
  descrizioneCorso: string = '';
  urlVideo: any[] = [];
  lunghezzaVideo: any[] = [];
  capitoliCorso: any[] = [];
  descrizioneCapitoliCorso: any[] = [];
  videoUrl: string[] = [];
  rispostaIscrizioneCorso: string = '';
  certificatoEsiste: boolean = false;
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
          this.urlVideo[i] = this.sanitizer.bypassSecurityTrustResourceUrl( this.capitoliCorso[i].videoUrl);// Sanitizza l'URL del video

          if (this.capitoliCorso[i].videoUrl != null)
          {
            this.lunghezzaVideo[i] = this.capitoliCorso[i].videoUrl.length;          
          }
          else 
          {
            this.lunghezzaVideo[i] = 0;
          }

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
  
@ViewChildren('playPauseButton') playPauseButtons!: QueryList<ElementRef>;
@ViewChildren('volumeButton') volumeButtons!: QueryList<ElementRef>;
@ViewChildren('muteButton') muteButtons!: QueryList<ElementRef>;
@ViewChildren('progressBar') progressBars!: QueryList<ElementRef>;
@ViewChildren('currentTime') currentTimeElems!: QueryList<ElementRef>;
@ViewChildren('totalTime') totalTimeElems!: QueryList<ElementRef>;
@ViewChildren('vimeoPlayer') vimeoPlayers!: QueryList<ElementRef>;
@ViewChildren('fullscreenButton') fullscreenButtons!: QueryList<ElementRef>;
@ViewChildren('controlVideo') controlVideos!: QueryList<ElementRef>;
@ViewChildren('volumeBar') volumeBars!: QueryList<ElementRef>;

private players: Player[] = [];
private videoDurations: number[] = [];
private beginValues: number[] = [];
private maxAllowedTimes: number[] = [];
isPlaying: boolean[] = [];
isMuted: boolean[] = [];
currentVolume: number[] = [];
showingSlider: boolean[] = [];
isFullscreen: boolean[] = [];
isMouseOnSlider: boolean[] = new Array(this.players.length).fill(false);

ngAfterViewInit(): void 
{
  this.setupProgressBars();
  setTimeout(() => {
    this.vimeoPlayers.changes.subscribe(() => {
      this.setupPlayers();
    });
  }, 0);
}

private setupProgressBars(): void 
{
  this.progressBars.forEach((progressBar) => {
    const progressBarElement = progressBar.nativeElement;

    if (progressBarElement) {
      progressBarElement.addEventListener('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = parseFloat(target.value); // Converti in numero
        const max = parseFloat(target.max); // Converti in numero
        
        if (!isNaN(value) && !isNaN(max) && max > 0) {
          const thumbPosition = (value / max) * 100;

          // Imposta una variabile CSS personalizzata per la posizione del cursore
          progressBarElement.style.setProperty('--thumb-position', `${thumbPosition}%`);
        }
      });
    }
  });
}

private setupPlayers(): void {
  this.players = [];
  this.videoDurations = [];
  this.beginValues = [];
  this.maxAllowedTimes = [];

  this.vimeoPlayers.toArray().forEach((iframe, index) => {
    const player = new Player(iframe.nativeElement);
    this.players.push(player);
    this.setupPlayerControls(index);

    this.beginValues[index] = 0;
    this.maxAllowedTimes[index] = 0;

    player.setCurrentTime(this.beginValues[index]).then(() => {
      this.progressBars.toArray()[index].nativeElement.value = this.beginValues[index].toString();
      this.currentTimeElems.toArray()[index].nativeElement.textContent = this.formatTime(this.beginValues[index]);
    }).catch(error => {
      console.error(`Errore nel ripristino del tempo a 0 per il video ${index}:`, error);
    });
  });
}

private setupPlayerControls(index: number): void {
  if (this.playPauseButtons && this.volumeButtons && this.progressBars && this.currentTimeElems && this.totalTimeElems) {
      const playPauseButton = this.playPauseButtons.toArray()[index]?.nativeElement;
      const volumeButton = this.volumeButtons.toArray()[index]?.nativeElement;
      const progressBar = this.progressBars.toArray()[index]?.nativeElement;
      const currentTimeElem = this.currentTimeElems.toArray()[index]?.nativeElement;
      const totalTimeElem = this.totalTimeElems.toArray()[index]?.nativeElement;

      if (playPauseButton && volumeButton && progressBar && currentTimeElem && totalTimeElem) {
          // Imposta i listener per play/pause
          playPauseButton.addEventListener('click', () => this.togglePlayPause(index));

          // Aggiungi l'evento per il volume slider
          const volumeSlider = volumeButton.querySelector('.volume-slider');
          if (volumeSlider) 
          {
              volumeSlider.addEventListener('input', (event: Event) => this.setVolume(event, index));
          }

          // Imposta il listener per la barra di avanzamento
          progressBar.addEventListener('input', (event: Event) => this.seekVideo(event, index));

          // Recupera la durata del video e imposta la barra di avanzamento
          this.players[index].getDuration().then((duration: number) => {
              this.videoDurations[index] = duration;
              progressBar.max = this.videoDurations[index].toString();
              totalTimeElem.textContent = this.formatTime(this.videoDurations[index]);
          }).catch(error => {
              console.error(`Errore nel recupero della durata del video ${index}:`, error);
          });

          // Aggiorna la barra di avanzamento durante la riproduzione
          this.players[index].on('timeupdate', () => {
              this.players[index].getCurrentTime().then((currentTime: number) => {
                  this.updateProgressBar(currentTime, index);
              }).catch(error => {
                  console.error(`Errore nel recupero del tempo corrente del video ${index}:`, error);
              });
          });
      } else {
          console.error(`Uno o più elementi di controllo non trovati per il video ${index}.`);
      }
  } else {
      console.error('Uno o più gruppi di controlli non trovati.');
  }
}


updateProgressBar(currentTime: number, index: number): void {
  this.progressBars.toArray()[index].nativeElement.value = currentTime.toString();
  this.currentTimeElems.toArray()[index].nativeElement.textContent = this.formatTime(currentTime);

  if (currentTime > this.maxAllowedTimes[index]) {
    this.maxAllowedTimes[index] = currentTime;
  }
}

 seekVideo(event: Event, index: number): void {
  const input = event.target as HTMLInputElement;
  const newTime = parseFloat(input.value);
  
  if (this.players[index]) {
    if (newTime <= this.maxAllowedTimes[index]) {
      this.players[index].setCurrentTime(newTime).catch(error => {
        console.error(`Errore nel saltare al tempo specificato per il video ${index}:`, error);
      });
    } else {
      this.players[index].setCurrentTime(this.maxAllowedTimes[index]).catch(error => {
        console.error(`Errore nel tentativo di saltare al tempo massimo consentito per il video ${index}:`, error);
      });
      this.progressBars.toArray()[index].nativeElement.value = this.maxAllowedTimes[index].toString();
    }
  } else {
    console.error(`Player non trovato per il video ${index}`);
  }
}


togglePlayPause(index: number): void {
  if (this.players[index]) {
    this.players[index].getPaused().then(paused => {
      const buttonElement = this.playPauseButtons.toArray()[index].nativeElement;

      if (paused) {
        this.players[index].play().catch(error => {
          console.error(`Errore nella riproduzione del video ${index}:`, error);
        });

        // Cambia l'icona in "Pause"
        buttonElement.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        this.players[index].pause().catch(error => {
          console.error(`Errore nella pausa del video ${index}:`, error);
        });

        // Cambia l'icona in "Play"
        buttonElement.innerHTML = '<i class="fas fa-play"></i>';
      }

      // Aggiorna lo stato isPlaying
      this.isPlaying[index] = !paused;
    }).catch(error => {
      console.error(`Errore nel recupero dello stato di pausa del video ${index}:`, error);
    });
  }
}

toggleMute(index: number): void 
{
  const volumeBar = this.volumeBars.toArray()[index]?.nativeElement;
  const volumeButton = this.volumeButtons.toArray()[index]?.nativeElement;

  if (volumeButton && volumeBar)
  {
    if (this.isMuted[index]) 
    {
      // Se è già mutato, ripristina il volume (ad esempio, 100)
      volumeBar.value = '100'; // Imposta la barra del volume al massimo
      this.currentVolume[index] = 100;
      volumeButton.querySelector('i')?.classList.remove('fa-volume-mute');
      volumeButton.querySelector('i')?.classList.add('fa-volume-up');

      // Imposta il volume del player a 1 (volume massimo)
      this.players[index].setVolume(1).catch(error => {
        console.error(`Errore nell'impostazione del volume per il video ${index}:`, error);
      });
    }   
    else
    {
      // Se non è mutato, imposta il volume a 0 (mute)
      volumeBar.value = '0'; // Imposta la barra del volume a 0
      this.currentVolume[index] = 0;
      volumeButton.querySelector('i')?.classList.remove('fa-volume-up');
      volumeButton.querySelector('i')?.classList.add('fa-volume-mute');

      // Imposta il volume del player a 0 (mute)
      this.players[index].setVolume(0).catch(error => {
        console.error(`Errore nell'impostazione del volume per il video ${index}:`, error);
      });
    }

    // Inverti lo stato di muting
    this.isMuted[index] = !this.isMuted[index];     
  }
}



showVolumeSlider(index: number): void 
{
  this.showingSlider[index] = true;
}

hideVolumeSlider(index: number): void 
{
  setTimeout(() => {
    if (!this.isMouseOnSlider[index]) 
    {
      this.showingSlider[index] = false;
    }
  }, 200);
}

keepSliderVisible(index: number): void 
{
  this.isMouseOnSlider[index] = true;
}

setVolume(event: Event, index: number): void 
{
  const input = event.target as HTMLInputElement;
  const volume = parseInt(input.value, 10) / 100;
  this.currentVolume[index] = parseInt(input.value, 10);
  const volumeButton = this.volumeButtons.toArray()[index]?.nativeElement;
  const volumeBar = this.volumeBars.toArray()[index]?.nativeElement;
  
  if (volumeButton && volumeBar)
  {
    if (this.currentVolume[index] == 0) 
    {
      volumeButton.querySelector('i')?.classList.remove('fa-volume-up');
      volumeButton.querySelector('i')?.classList.add('fa-volume-mute');
      this.isMuted[index] = true; 
      this.players[index].setVolume(0).catch(error => {
        console.error(`Errore nell'impostazione del volume per il video ${index}:`, error);
      });
    } 
    else if (this.currentVolume[index] > 0 && this.currentVolume[index] <= 100) 
    {
      volumeButton.querySelector('i')?.classList.remove('fa-volume-mute');
      volumeButton.querySelector('i')?.classList.add('fa-volume-up');
      this.isMuted[index] = false; 
      
      this.players[index].setVolume(volume).catch(error => {
        console.error(`Errore nell'impostazione del volume per il video ${index}:`, error);
      });
    }    
  }
}

private formatTime(seconds: number): string 
{
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

toggleFullscreen(index: number): void 
{
  const iframe = this.vimeoPlayers.toArray()[index]?.nativeElement;
  const fullscreenButton = this.fullscreenButtons.toArray()[index]?.nativeElement;
  const controlVideo = this.controlVideos.toArray()[index]?.nativeElement;

  if (iframe && fullscreenButton && controlVideo) 
  {
    if (this.isFullscreen[index]) 
    {
      // Exit fullscreen mode
      iframe.classList.remove('fullscreen');
      controlVideo.classList.remove('fullscreen');
      fullscreenButton.querySelector('i')?.classList.remove('fa-compress');
      fullscreenButton.querySelector('i')?.classList.add('fa-expand');
    } 
    else 
    {
      // Enter fullscreen mode
      iframe.classList.add('fullscreen');
      controlVideo.classList.add('fullscreen');
      fullscreenButton.querySelector('i')?.classList.remove('fa-expand');
      fullscreenButton.querySelector('i')?.classList.add('fa-compress');
    }
    this.isFullscreen[index] = !this.isFullscreen[index];
  }
}
// Aggiungi queste funzioni per mostrare e nascondere i controlli quando il mouse è sopra il video
// @HostListener('document:mousemove', ['$event'])
// onMouseMove(event: MouseEvent): void {
//   const controls = document.querySelectorAll('.controls');
//   controls.forEach(control => (control as HTMLElement).classList.remove('hidden'));
  
//   setTimeout(() => {
//     controls.forEach(control => (control as HTMLElement).classList.add('hidden'));
//   }, 3000); // Nascondi i controlli dopo 3 secondi senza movimento del mouse
// }

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