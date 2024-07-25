import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent 
{
    constructor(private dataService: DataService) {}  
    userId: string = '';
    token: string = '';
    usernameUtente: string = '';
    coursesSubscription: any[] = [];    
    coursesMore: any[] = [];    
    error: string = '';

  ngOnInit(): void 
  {
    //ottengo l'idUtente e il Token dal Local Storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId != null) {this.userId = storedUserId;} 
    else {this.userId = 'idUtente non trovato';}
    console.log('User ID:',storedUserId);    

    //ottengo il Token dal Local Storage
    const storedToken = localStorage.getItem('authToken');    
    if (storedToken != null) {this.token = storedToken;} 
    else {this.token = 'Token non trovato';}
    console.log('Token:',storedToken);

    //Richiamo il metodo getUtenteId
    this.dataService.getUtenteId(this.userId).subscribe({
      next: (user: any) => {
        this.usernameUtente = user.username;
      },
      error: (err: any) => {
        console.error("Errore nel recupero dell'utente", err);
        this.error = 'Errore nel recupero degli utenti';
      }
    });

    //Richiamo il metodo getCoursesSubscriptions
    this.dataService.getCoursesSubscriptions(this.userId).subscribe({
      next: (data: any[]) => {
        this.coursesSubscription = data;
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });

    //Richiamo il metodo getMoreCourses
    this.dataService.getMoreCourses(this.userId).subscribe({
      next: (data: any[]) => {
        this.coursesMore = data;
        // console.log(this.coursesMore);
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });
  }
  saveCourseId(event: Event, courseId: string): void {
    console.log('Saving Course ID:', courseId);
    localStorage.setItem('selectedCourseId', courseId);
    // event.preventDefault();
  }
}
