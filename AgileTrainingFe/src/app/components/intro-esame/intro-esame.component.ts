import { Component, HostListener } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intro-esame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro-esame.component.html',
  styleUrl: './intro-esame.component.css'
})
export class IntroEsameComponent 
{
  constructor(private dataService: DataService, private router: Router) { this.checkForDuplicateTab();} 
  private userId: string = '';
  idtest: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
  esameCorso: any = '';
  domandeCorso: any[] = [];
  numeroTentativi: any = '';
  numeroTentativiRimasti: number = 0;
  error: string = '';

  esameIniziato: boolean = false;
  idTestResult: string = '';

  ngOnInit(): void 
  {
    //ottengo l'idUtente e il Token dal Local Storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId != null) {this.userId = storedUserId;} 
    else {this.userId = 'idUtente non trovato';}
    console.log('User ID:',storedUserId);    

    //ottengo l'idCorso dal Local Storage
    const storedCorsoId = localStorage.getItem('selectedCourseId');
    if (storedCorsoId != null) {this.idCorso = storedCorsoId;} 
    else {this.idCorso = 'idCorso non trovato';}
    console.log('Corso ID:',storedCorsoId);   

    //Richiamo il metodo getCoursesById per ottenere il nome del corso
    this.dataService.getCoursesById(this.idCorso).subscribe({
      next: (data: any) => {
        this.nomeCorso = data.courseName;
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });
    //Richiamo il metodo getChaptersByIdCourse per ottenere la durata dell'esame
    this.dataService.getChaptersByIdCourse(this.idCorso).subscribe({
      next: (data: any[]) => {
        this.esameCorso = data[data.length - 1];  
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });

    //ottengo l'id del test collegato al corso
    this.dataService.getTestIdByCourseId(this.idCorso).subscribe({
      next: (response: any) => {
        this.idtest = response;
        console.log("id test: " + this.idtest);

            //si ottiene il numero dei tentativi di un utente di un certo esame
            this.dataService.getAttempts(this.idtest, this.userId).subscribe({
              next: (response: any) => {
                this.numeroTentativi = response;
                this.numeroTentativiRimasti = 3 - this.numeroTentativi;
                // console.log("Numeri Tentativi: " + this.numeroTentativi);

                if(this.numeroTentativi >= 3)
                {
                  console.log("Non puoi fare l'esame perchè hai raggiunto il numero di tentativi massimo di 3");

                }
              },
              error: (err: any) => {
                console.error('Errore nel salvataggio del punteggio', err);
                this.error = 'Errore nel salvataggio del punteggio';
              }
            });
          },
      error: (err: any) => {
        console.error("Errore nell'iniziare il test", err);
        this.error = "Errore nell'iniziare il test";
      }
    });
  }

  private readonly pageIdKey = 'introEsame123';
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

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Rimuovi l'identificatore unico dal localStorage quando la scheda viene chiusa o ricaricata
    localStorage.removeItem(this.pageIdKey);
  }

  startExam() 
  {
    //ottengo l'id del test collegato al corso
    this.dataService.getTestIdByCourseId(this.idCorso).subscribe({
      next: (response: any) => {
        this.idtest = response;

        //creo un nuovo test
        this.dataService.beginTest(this.idtest, this.userId).subscribe({
          next: (data: any) => {
            this.idTestResult = data.testResultId;
            localStorage.setItem('idTestResult', this.idTestResult);

            //rimuovi la memorizzazione della scheda aperta nel LocalStorage
            localStorage.removeItem(this.pageIdKey);
            localStorage.removeItem('isExamWindowOpen');

            // Naviga verso la pagina dell'esame dopo aver creato il test
            localStorage.setItem('esameIniziato', 'true');
            this.router.navigate(['/esame', 1]);
          },
          error: (err: any) => {
            console.error('Errore nel recupero dei corsi', err);
            this.error = 'Errore nel recupero dei corsi';
          }
        });
      },
      error: (err: any) => {
        console.error("Errore nell'iniziare il test", err);
        this.error = "Errore nell'iniziare il test";
      }
    });
  }

  tornaAlCorso()
  {
    localStorage.removeItem(this.pageIdKey);
    localStorage.removeItem('isExamWindowOpen');
    this.router.navigate(['/corso']);
  }
  tornaAllaHome()
  {
    localStorage.removeItem(this.pageIdKey);
    localStorage.removeItem('isExamWindowOpen');
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void
  {
    localStorage.removeItem(this.pageIdKey);
    localStorage.removeItem('isExamWindowOpen');
  }
}
