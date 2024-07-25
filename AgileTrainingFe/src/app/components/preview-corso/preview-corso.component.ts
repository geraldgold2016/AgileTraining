import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-corso',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './preview-corso.component.html',
  styleUrl: './preview-corso.component.css'
})
export class PreviewCorsoComponent 
{
  constructor(private dataService: DataService) {}  
  userId: string = '';
  idCorso: string = '';
  rispostaCorso: any = '';
  nomeCorso: string = '';
  descrizioneCorso: string = '';
  CapitoliCorso: any[] = [];
  // descrizioneCapitoliCorso: any[] = [];
  error: string = '';

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

    //Richiamo il metodo getCoursesById per ottenere la descrizione del corso
    this.dataService.getCoursesById(this.idCorso).subscribe({
      next: (data: any) => {
        this.descrizioneCorso = data.courseDescription;
        this.nomeCorso = data.courseName
        console.log(this.descrizioneCorso);
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });

    //Richiamo il metodo getChaptersByIdCourse per ottenere tutti i capitoli del corso
    this.dataService.getChaptersByIdCourse(this.idCorso).subscribe({
      next: (data: any[]) => {
        this.CapitoliCorso = data;  
        // this.descrizioneCapitoliCorso = data;  
        console.log(this.CapitoliCorso);
        // console.log(this.descrizioneCapitoliCorso);
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }

    });
  }

  toggleAccordion(event: any): void 
  {
    const element = event.target;
    element.classList.toggle("active");
    const panel = element.nextElementSibling; //seleziona l'elemento prossimo più vicino
    if (panel.style.maxHeight != "") //se l'altezza massima del panel, sottoforma di stringa, non è vuota
    {
      panel.style.maxHeight = ""; //allora annulla l'altezza massima
    } 
    else 
    {
      panel.style.maxHeight = panel.scrollHeight + "px"; //altrimenti mi inserisci l'altezza massima
    } 
      
    const icona = element.querySelector('.fa-angle-down');
    if (icona) {icona.classList.toggle('rotated');}
  }
}