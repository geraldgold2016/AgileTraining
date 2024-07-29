import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {}

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

  ngOnInit(): void {
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

    // Richiamo il metodo getChaptersByIdCourse per ottenere la durata dell'esame
    this.dataService.getChaptersByIdCourse(this.idCorso).subscribe({
      next: (data: any[]) => {
        this.esameCorso = data[data.length - 1];
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
  }

  ngOnDestroy(): void {
    // Rimuovere i listener quando il componente viene distrutto
    window.removeEventListener('popstate', this.preventBackNavigation);
    window.removeEventListener('keydown', this.disableRefresh);
    window.removeEventListener('contextmenu', this.disableContextMenu);
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

    //chiamata per avere l'id del test
    this.dataService.getTestIdByCourseId(this.idCorso).subscribe({
      next: (response: any) => {
        this.idtest = response;
        console.log("id test: " + this.idtest);

        //chiamata per avere l'id corrente del test
        this.dataService.getLatestTestResultId(this.userId, this.idtest).subscribe({
          next: (latestId: any) => {
            this.latestTestResultId = latestId;
            console.log("l'ultimo id test: " + this.latestTestResultId);

            console.log(this.punteggio);

            //chiamata per inserire il punteggio del test
            this.dataService.submitTest(this.punteggio.toString(), this.latestTestResultId).subscribe({
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
          },
          error: (err: any) => {
            console.error("Errore nel recupero dell'ID del test più recente", err);
            this.error = "Errore nel recupero dell'ID del test più recente";
          }
        });
      },
      error: (err: any) => {
        console.error("Errore nell'iniziare il test", err);
        this.error = "Errore nell'iniziare il test";
      }
    });


  }
}
