import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-esame',
  standalone: true,
  imports: [],
  templateUrl: './intro-esame.component.html',
  styleUrl: './intro-esame.component.css'
})
export class IntroEsameComponent 
{
  constructor(private dataService: DataService, private router: Router) {} 
  userId: string = '';
  idtest: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
  esameCorso: any = '';
  domandeCorso: any[] = [];
  error: string = '';

  esameIniziato: boolean = false;

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

  }

  startExam() 
  {
    this.dataService.getTestIdByCourseId(this.idCorso).subscribe({
      next: (response: any) => {
        this.idtest = response;
        console.log(this.idtest);

      this.dataService.beginTest(this.userId, this.idtest).subscribe({
        next: (response: any) => {
          console.log('Test iniziato con successo:', response);
          this.esameIniziato = true;
        },
        error: (err: any) => {
          console.error("Errore nell'iniziare il test", err);
          this.error = "Errore nell'iniziare il test";
        }
      });


      },
      error: (err: any) => {
        console.error("Errore nell'ottenere l'idtest", err);
        this.error = "Errore nell'ottenere l'idtest";
      }
    });


    this.router.navigate(['/esame', 1]);
  }
}
