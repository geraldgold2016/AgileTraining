import { Component, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import Player from '@vimeo/player';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './corso.component.html',
  styleUrl: './corso.component.css'
})
export class CorsoComponent 
{
  constructor(private dataService: DataService, private sanitizer: DomSanitizer, private router: Router) {} 

  userId: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
  descrizioneCorso: string = '';
  urlVideo: any[] = [];
  esistenzaVideo: boolean[] = [];
  lunghezzaVideo: number[] = [];
  lunghezzaVideoStringa: string[] = [];
  capitoliCorso: any[] = [];
  totaleCapitoli: number = 0;
  capitoliCompletati: number = 0;
  capitoliCompletatiCondizione: boolean[] = [];
  tempoTrascorsoStringa: string = '';
  tempoCorrente: string = '';
  tempoTotale: number = 0;
  percentualeVideo: number = 0;
  tempoTrascorso: number[] = [];
  accordionStatus: boolean[] = [];
  descrizioneCapitoliCorso: any[] = [];
  videoUrl: string[] = [];
  rispostaIscrizioneCorso: string = '';
  certificatoEsiste: boolean = false;
  error: string = '';


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
  @ViewChildren('videoContainer') videoContainers!: QueryList<ElementRef>;
  
  players: Player[] = [];
  videoDurations: number[] = [];
  beginValues: number[] = [];
  maxAllowedTimes: number[] = [];
  isPlaying: boolean[] = [];
  isMuted: boolean[] = [];
  currentVolume: number[] = [];
  showingSlider: boolean[] = [];
  isFullscreen: boolean[] = [];
  isMouseOnSlider: boolean[] = new Array(this.players.length).fill(false);

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
      }
    });

    //Richiamo il metodo getChaptersByIdCourse per ottenere tutti i capitoli del corso
    this.dataService.getChaptersByIdCourse(this.idCorso).subscribe({
      next: (data: any[]) => {
        for(var i = 0; i < data.length - 1; i++)  //prendi tutto tranne l'ultimo elemento dell'array
        {
          this.capitoliCorso[i] = data[i];
          this.urlVideo[i] = this.sanitizer.bypassSecurityTrustResourceUrl( this.capitoliCorso[i].videoUrl);// Sanitizza l'URL del video
          this.lunghezzaVideoStringa[i] = data[i].videoDuration; //
          this.lunghezzaVideo[i] =  this.convertToSeconds(this.lunghezzaVideoStringa[i]); //
          console.log("lunghezza video: " + this.lunghezzaVideo[i]);

          if (this.capitoliCorso[i].videoUrl != null)
          {
            this.esistenzaVideo[i] = true;          
          }
          else 
          {
            this.esistenzaVideo[i] = false;
          }
        }
        this.totaleCapitoli = data.length;
        console.log("esistenza video: " + this.esistenzaVideo);

        //nel file html c'è capitolo.moduleName al posto di CapitoliCorso.moduleName
        //perchè all'inizio dell'accordion c'è il ciclo *ngFor = "let capitolo of CapitoliCorso"
        //quindi capitolo rappresenta una riga dell'array CapitoliCorso
      },
      error: (err: any) => {console.error('Errore nel recupero dei corsi', err);}
    });

    //Richiamo il metodo checkCertificate per verificare l'esistenza del certificato
    this.dataService.checkCertificate(this.idCorso, this.userId).subscribe({
      next: (data: any) => {
        this.certificatoEsiste = data;
      },
      error: (err: any) => {
        console.error('Errore nel recupero esistenza certificato', err);
      }
    });

    this.dataService.getActivity(this.userId, this.idCorso).subscribe({
      next: (data: any) => {
        this.capitoliCompletati = data.totalModulesCompleted;
        this.tempoTrascorsoStringa = data.currentElapsedTime;

        for (var i = 0; i < this.totaleCapitoli; i++)
        {
          this.capitoliCompletatiCondizione[i] = false;
          if (i < this.capitoliCompletati)
          {
            this.capitoliCompletatiCondizione[i] = true;
            this.tempoTrascorso[i] = this.lunghezzaVideo[i];
          }
          else if(i >= this.capitoliCompletati)
          {
            this.tempoTrascorso[i] = 0;
          }  
        }

        //Tempo di visione del video corrente
        this.tempoTrascorso[this.capitoliCompletati] = this.convertToSeconds(this.tempoTrascorsoStringa);
        console.log("capitoliCompletatiCondizione: " + this.capitoliCompletatiCondizione);
        console.log("Tempi trascorsi: " + this.tempoTrascorso);

        //aggiunta del capitolo corrente
        this.capitoliCompletati += 1;
        console.log("Totale capitoli completati: " + this.capitoliCompletati);        
      },
      error: (err: any) => {
        console.error("Errore nel recupero dell'activity", err);
      }
    });
  }

  convertToTime(totalSeconds: number): string 
  {
    if (totalSeconds == null || totalSeconds < 0) 
    {
      return '00:00:00'; // Gestisce il caso in cui il valore dei secondi è nullo o negativo
    }
  
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60); // Arrotonda i secondi per rimuovere eventuali decimali
  
    // Format the time parts as two-digit numbers
    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    const secondsString = seconds.toString().padStart(2, '0');
  
    return `${hoursString}:${minutesString}:${secondsString}`;
  }
  


  convertToSeconds(timeString: string): number 
  {
    //in caso la stringa è vuota
    if (timeString == null || timeString == '' || timeString == undefined)
    {
      return 0;
    }

    // Dividi la stringa in ore, minuti e secondi
    const timeParts = timeString.split(":");
      
    // Converte ore, minuti e secondi in numeri
    const hours = Number(timeParts[0]);
    const minutes = Number(timeParts[1]);
    const seconds = Number(timeParts[2]);
      
    // Calcola il totale in secondi
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    return totalSeconds;
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
  setTimeout(() => {
    this.vimeoPlayers.changes.subscribe(() => {
      this.setupPlayers();
    });
  }, 0);
}

private setupPlayers(): void 
{
  this.players = [];
  this.videoDurations = [];
  this.beginValues = [];
  this.maxAllowedTimes = [];

  this.vimeoPlayers.toArray().forEach((iframe, index) => {
    const player = new Player(iframe.nativeElement);
    this.players.push(player);
    this.setupPlayerControls(index);

    // quando il video è stato caricato
    player.on('loaded', () => {
      console.log(`Video ${index} caricato e pronto per la riproduzione.`);

        let beginTime = 0;
        if (this.tempoTrascorso[index] !== undefined && !isNaN(this.tempoTrascorso[index])) 
        {
          // Imposta il tempo di inizio in base a tempoTrascorso
          beginTime = this.tempoTrascorso[index];
        }

        this.beginValues[index] = beginTime;
        this.maxAllowedTimes[index] = beginTime;

        // Imposta il tempo corrente
        player.setCurrentTime(this.beginValues[index]).then(() => {
          this.progressBars.toArray()[index].nativeElement.value = this.beginValues[index].toString();
          this.currentTimeElems.toArray()[index].nativeElement.textContent = this.formatTime(this.beginValues[index]);
        }).catch(error => {console.error(`Errore nel ripristino del tempo per il video ${index}:`, error);});
    });
  });
}


private setupPlayerControls(index: number): void 
{
  if (this.playPauseButtons && this.volumeButtons && this.progressBars && this.currentTimeElems && this.totalTimeElems) 
  {
      const playPauseButton = this.playPauseButtons.toArray()[index]?.nativeElement;
      const volumeButton = this.volumeButtons.toArray()[index]?.nativeElement;
      const progressBar = this.progressBars.toArray()[index]?.nativeElement;
      const currentTimeElem = this.currentTimeElems.toArray()[index]?.nativeElement;
      const totalTimeElem = this.totalTimeElems.toArray()[index]?.nativeElement;

      if (playPauseButton && volumeButton && progressBar && currentTimeElem && totalTimeElem) 
      {
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

              if (duration !== undefined && duration !== null) 
              {
                  progressBar.max = this.videoDurations[index].toString();
                  totalTimeElem.textContent = this.formatTime(this.videoDurations[index]);
              } 
              else 
              {
                  console.error(`Durata non valida per il video ${index}`);
              }
          }).catch(error => {
              console.error(`Errore nel recupero della durata del video ${index}:`, error);
          });

          //evento durante la riproduzione del video
          this.players[index].on('timeupdate', () => {
            this.players[index].getDuration().then((duration: number) => {
              if (this.capitoliCompletatiCondizione[index] == false)
                {
                  this.tempoTotale = Math.floor(duration);
                }

            }).catch(error => {
              console.error(`Errore nel recupero del tempo corrente del video ${index}:`, error);
          });

              this.players[index].getCurrentTime().then((currentTime: number) => {
                  this.updateProgressBar(currentTime, index);// Aggiorna la barra di avanzamento durante la riproduzione

                  if (this.capitoliCompletatiCondizione[index] == false)
                  {
                    currentTime = Math.floor(currentTime)            
                    this.percentualeVideo = Number(((100 * currentTime)/this.tempoTotale).toFixed(2));
                    // console.log(this.percentualeVideo);
                    this.tempoCorrente = this.convertToTime(currentTime);
                    // this.dataService.updateActivityVisioneVideo(this.userId, this.idCorso, this.tempoCorrente, this.percentualeVideo).subscribe({
                    //   error: (err: any) => {console.error("Errore nel recupero dell'activity", err);}
                    // });
                  }

                }).catch(error => {
                  console.error(`Errore nel recupero del tempo corrente del video ${index}:`, error);
              });
          });

          // Quando l'utente ha finito di vedere tutto il video
          this.players[index].on('ended', () => 
          {         
            if (this.capitoliCompletatiCondizione[index] == false)
            {
              console.log('Fine Video');
              this.capitoliCompletati += 1;    
              this.capitoliCompletatiCondizione[index] = true;    

              this.dataService.updateActivityFineVideo(this.userId, this.idCorso).subscribe({
                error: (err: any) => { console.error("Errore nell'aggiornamento dell'activity", err); }
              });
            }
          });
      } 
      else 
      {
          console.error(`Uno o più elementi di controllo non trovati per il video ${index}.`);
      }
  } 
  else 
  {
      console.error('Uno o più gruppi di controlli non trovati.');
  }
}



updateProgressBar(currentTime: number, index: number): void 
{
  this.progressBars.toArray()[index].nativeElement.value = currentTime.toString();
  this.currentTimeElems.toArray()[index].nativeElement.textContent = this.formatTime(currentTime);

  if (currentTime > this.maxAllowedTimes[index]) 
  {
    this.maxAllowedTimes[index] = currentTime;
  }
}

 seekVideo(event: Event, index: number): void 
 {
  const input = event.target as HTMLInputElement;
  const newTime = parseFloat(input.value);
  
  if (this.players[index]) 
  {
    if (newTime <= this.maxAllowedTimes[index]) 
    {
      this.players[index].setCurrentTime(newTime).catch(error => {
        console.error(`Errore nel saltare al tempo specificato per il video ${index}:`, error);
      });
    } 
    else 
    {
      this.players[index].setCurrentTime(this.maxAllowedTimes[index]).catch(error => {
        console.error(`Errore nel tentativo di saltare al tempo massimo consentito per il video ${index}:`, error);
      });
      this.progressBars.toArray()[index].nativeElement.value = this.maxAllowedTimes[index].toString();
    }
  } 
  else 
  {
    console.error(`Player non trovato per il video ${index}`);
  }
}


togglePlayPause(index: number): void 
{
  if (this.players[index]) 
  {
    this.players[index].getPaused().then(paused => {
      const buttonElement = this.playPauseButtons.toArray()[index].nativeElement;

      if (paused) 
      {
        this.players[index].play().catch(error => {
          console.error(`Errore nella riproduzione del video ${index}:`, error);
        });

        // Cambia l'icona in "Pause"
        buttonElement.innerHTML = '<i class="fas fa-pause"></i>';
      } 
      else 
      {
        this.players[index].pause().catch(error => {
          console.error(`Errore nella pausa del video ${index}:`, error);
        });

        // Cambia l'icona in "Play"
        buttonElement.innerHTML = '<i class="fas fa-play"></i>';
      }

      this.players[index].on('ended', () => 
        {
          // Cambia l'icona in "Play"
          buttonElement.innerHTML = '<i class="fas fa-play"></i>';
        });

      // Aggiorna lo stato isPlaying
      this.isPlaying[index] = !paused;

    }).catch(error => {
      console.error(`Errore nel recupero dello stato di pausa del video ${index}:`, error);
    });
    
  }
}

@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any): void 
{
 this.players[this.capitoliCompletati].getCurrentTime().then(() => {

      // this.dataService.updateActivityVisioneVideo(this.userId, this.idCorso, this.tempoCorrente, this.percentualeVideo).subscribe({
      //   error: (err: any) => {console.error("Errore nel recupero dell'activity", err);}
      // });

      const data = {
        userId: this.userId,
        idCorso: this.idCorso,
        tempoCorrente: this.tempoCorrente,
        percentualeVideo: this.percentualeVideo
      };

          // Utilizza sendBeacon per inviare i dati
    navigator.sendBeacon('/api/updateActivityVisioneVideo', JSON.stringify(data));

  }).catch(error => {
    console.error(`Errore nel recupero del tempo corrente del video ${this.capitoliCompletati}:`, error);
});  
  $event.returnValue = 'Sei sicuro di voler lasciare la pagina?';
 
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
  const fullscreenButton = this.fullscreenButtons.toArray()[index]?.nativeElement;
  const videoContainer = this.videoContainers.toArray()[index]?.nativeElement;

  if (fullscreenButton && videoContainer) 
  {
    if (this.isFullscreen[index]) 
    {
      // Exit fullscreen mode
      fullscreenButton.querySelector('i')?.classList.remove('fa-compress');
      fullscreenButton.querySelector('i')?.classList.add('fa-expand');
      document.exitFullscreen();      
      videoContainer.classList.remove('fullscreen');
    } 
    else 
    {
      // Enter fullscreen mode
      fullscreenButton.querySelector('i')?.classList.remove('fa-expand');
      fullscreenButton.querySelector('i')?.classList.add('fa-compress');
      videoContainer.requestFullscreen();
      videoContainer.classList.add('fullscreen');
    }
    this.isFullscreen[index] = !this.isFullscreen[index];
  }
}

  // Funzione per gestire l'apertura o chiusura dell'accordion
  verifyAccordion(event: any, index: number): void 
  {
    const element = event.target as HTMLElement;
    const accordion = element.closest('.accordion');

    if (index < this.capitoliCompletati) 
    {
      if (accordion) 
      {
        accordion.classList.remove("disabled");
        accordion.classList.toggle("active");
        const panel = accordion.nextElementSibling as HTMLElement;
        if (panel.style.maxHeight) 
        {
          panel.style.maxHeight = "";
        } 
        else 
        {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
        const icon = accordion.querySelector('.fa-angle-down');
        if (icon) 
        {
          icon.classList.toggle('rotated');
        }
      }
    } 
    else 
    {
      // Tutti gli altri sono bloccati
      if (accordion) 
      {
        accordion.classList.add("disabled");
      }
    }
  }
}