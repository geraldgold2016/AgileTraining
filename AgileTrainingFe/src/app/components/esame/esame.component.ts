import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-esame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './esame.component.html',
  styleUrls: ['./esame.component.css']
})
export class EsameComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {this.checkForDuplicateTab();}

  userId: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
  esameCorso: any = '';
  domandaCorrente: any;
  domandaCorrenteNumero: number = 0;
  ultimaDomanda: boolean = false;

  idDomandaCorrente: string = '';
  testoDomandaCorrente: string = '';
  risposte: any[] = [];
  testoRisposte: any[] = [];
  selectedAnswers: { [key: number]: string } = {};
  risposteCorrette: any[] = [];
  rispostaCorretta: any;
  punteggio: number = 0;  
  error: string = '';

  esameIniziato: boolean = false;
  latestTestResultId: any;
  idtest: any;
  timerInterval: any; 
  idTestResult: string = '';


  ngOnInit(): void 
  {
    // Ottengo l'idUtente e il Token dal Local Storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId != null) {this.userId = storedUserId;} 
    else {this.userId = 'idUtente non trovato';}

    // Ottengo l'idCorso dal Local Storage
    const storedCorsoId = localStorage.getItem('selectedCourseId');
    if (storedCorsoId != null) {this.idCorso = storedCorsoId;} 
    else {this.idCorso = 'idCorso non trovato';}

    // Ottengo l'idTestResult dal Local Storage
    const idTestResult = localStorage.getItem('idTestResult');
    if (idTestResult != null) {this.idTestResult = idTestResult;}
    else {this.idTestResult = 'idTestResult non trovato';}
    console.log("idTestResult localStorage: " + idTestResult);

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

    // Richiamo il metodo getChaptersByIdCourse per ottenere la durata dell'esame
    // Poi faccio partire il timer
    this.dataService.getChaptersByIdCourse(this.idCorso).subscribe({
      next: (data: any[]) => {
        this.esameCorso = data[data.length - 1];
        this.startTimer(this.esameCorso.duration);
        // this.startTimer(1);
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });

    // Sottoscrizione ai parametri del route per ottenere il numero della domanda corrente
    this.route.params.subscribe(params => {
      if (!params['numeroDomanda']) {
        this.domandaCorrenteNumero = 1;
        this.router.navigate(['/esame', 1]);
      } else {
        this.domandaCorrenteNumero = +params['numeroDomanda'];
      }
      this.loadQuestions();
    });

    // Prevenire la navigazione indietro
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', this.preventBackNavigation);

    // Disabilitare il pulsante di refresh (F5), combinazioni di tasti per ricaricare e il menu contestuale (clic destro)
    window.addEventListener('keydown', this.disableRefresh);
    window.addEventListener('contextmenu', this.disableContextMenu);

    // Aggiungere l'evento di chiusura della scheda
    this.addUnloadEvent();

    console.log("idTestResult: " + this.idTestResult);
  }

  preventBackNavigation(event: PopStateEvent): void {
    history.pushState(null, '', window.location.href);
  }

  disableRefresh(event: KeyboardEvent): void {
    if (
      event.key === 'F5' ||
      (event.ctrlKey && event.key === 'r') ||
      (event.ctrlKey && event.key === 'R') ||
      (event.ctrlKey && event.key === 'F5') ||
      (event.metaKey && event.key === 'r') ||
      (event.metaKey && event.key === 'R') ||
      (event.metaKey && event.key === 'F5')
    ) {
      event.preventDefault();
    }
  }

  disableContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }

  loadQuestions(): void {
    const storedQuestionIds = sessionStorage.getItem('questionIds');
    if (storedQuestionIds) {
      this.loadCurrentQuestion();
    } else {
      this.dataService.getQuestionByCourseId(this.idCorso).subscribe({
        next: (data: any[]) => {
          const questionIds = data; // Memorizza solo gli ID
          sessionStorage.setItem('questionIds', JSON.stringify(questionIds));
          this.loadCurrentQuestion();
        },
        error: (err: any) => {
          console.error('Errore nel recupero delle domande', err);
          this.error = 'Errore nel recupero delle domande';
        }
      });
    }
  }

  loadCurrentQuestion(): void {
    const questionIds = JSON.parse(sessionStorage.getItem('questionIds') || '[]');
    const currentQuestionId = questionIds[this.domandaCorrenteNumero - 1];

    if (currentQuestionId) {
      this.dataService.getQuestionById(currentQuestionId).subscribe({
        next: (data: any) => {
          this.domandaCorrente = data;
          this.testoDomandaCorrente = this.domandaCorrente.text;
          this.loadOptions(currentQuestionId);
          this.ultimaDomanda = this.domandaCorrenteNumero === questionIds.length;
        },
        error: (err: any) => {
          console.error('Errore nel recupero della domanda', err);
          this.error = 'Errore nel recupero della domanda';
        }
      });
    }
  }

  loadOptions(questionId: number): void {
    this.dataService.getOptionsByIdQuestion(questionId.toString()).subscribe({
      next: (data: any[]) => {
        this.risposte = data;
        this.testoRisposte = data.map(item => item.text);
        this.risposteCorrette = data.map(item => item.correct);
        console.log(this.risposteCorrette);
      },
      error: (err: any) => {
        console.error('Errore nel recupero delle opzioni', err);
        this.error = 'Errore nel recupero delle opzioni';
      }
    });
  }

  selectAnswer(answer: string): void {
    this.selectedAnswers[this.domandaCorrenteNumero] = answer;
  }

  checkAnswer(): void {
    const selectedAnswerId = this.selectedAnswers[this.domandaCorrenteNumero];
    const selectedAnswerIndex = this.risposte.findIndex(risposta => risposta.text === selectedAnswerId);

    if (selectedAnswerIndex !== -1 && this.risposteCorrette[selectedAnswerIndex]) {
      this.punteggio++;
    }
  }

  nextQuestion(): void {
    this.checkAnswer();
    this.domandaCorrenteNumero++;
    this.router.navigate(['/esame', this.domandaCorrenteNumero]);
  }

  finishExam(): void 
  {
    this.checkAnswer(); // Verifica l'ultima risposta

    if (this.punteggio == null)
    {
      this.punteggio = 0;
    }

    //chiamata per inserire il punteggio del test
    this.dataService.submitTest(this.punteggio.toString(), this.idTestResult).subscribe({
      next: (response: any) => {
        console.log('Punteggio salvato con successo:', response);
        sessionStorage.removeItem('questionIds');
        localStorage.setItem('punteggio', this.punteggio.toString());
        if (this.punteggio < 18) {
          this.router.navigate(['/esameFail']);
        } else {
          this.router.navigate(['/esameSuccess']);
        }
      },
      error: (err: any) => {
        console.error('Errore nel salvataggio del punteggio', err);
        this.error = 'Errore nel salvataggio del punteggio';
      }
    });
  }

  startTimer(duration: number): void 
  {
    let timer = this.getRemainingTime();
    if (timer === 0) 
    {
      this.setExpirationTime(duration);
      timer = duration * 60;
    }
  
    const display = document.getElementById('timer');
    this.timerInterval = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
  
      const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
      const secondsStr = seconds < 10 ? '0' + seconds : seconds.toString();
  
      if (display) {
        display.textContent = minutesStr + ':' + secondsStr;
      }
  
      if (--timer < 0) {
        clearInterval(this.timerInterval);
        this.finishExam();
        console.log('Tempo scaduto');
      }
    }, 1000);
  }

  setExpirationTime(minutes: number): void 
  {
    const currentTime = Date.now();
    const expirationTime = currentTime + minutes * 60 * 1000;
    localStorage.setItem('examExpirationTime', expirationTime.toString());
  }
  
  getRemainingTime(): number 
  {
    const expirationTime = parseInt(localStorage.getItem('examExpirationTime') || '0', 10);
    const currentTime = Date.now();
    return Math.max(0, Math.floor((expirationTime - currentTime) / 1000));
  }
  


  private readonly pageIdKey = 'Esame123';
  private readonly pageIdValue = 'uniquePage321';

  //funzione per impedire la duplicazione della scheda
  private checkForDuplicateTab() 
  {
    const existingPageId = localStorage.getItem(this.pageIdKey);

    if (existingPageId && existingPageId === this.pageIdValue) {
      // Scheda duplicata rilevata, chiudi la scheda
      alert("La pagina dell'esame è già aperta in un'altra scheda");
      window.close();
    } else {
      // Imposta l'identificatore unico nel localStorage
      localStorage.setItem(this.pageIdKey, this.pageIdValue);
    }
  }

  //Alla chiusura della scheda il tentativo esame è aumentato di 1
  addUnloadEvent() 
  {
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

  handleBeforeUnload() 
  {
    localStorage.setItem('esameIniziato', 'false');
    localStorage.setItem('punteggio', "0");
    sessionStorage.removeItem('questionIds');
    localStorage.setItem('examExpirationTime', "0");
    localStorage.removeItem(this.pageIdKey);
  }

  ngOnDestroy(): void 
  {
    // Rimuovere i listener quando il componente viene distrutto
    window.removeEventListener('popstate', this.preventBackNavigation);
    window.removeEventListener('keydown', this.disableRefresh);
    window.removeEventListener('contextmenu', this.disableContextMenu);
    window.removeEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

}
