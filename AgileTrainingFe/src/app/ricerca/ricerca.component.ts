import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ricerca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.css'
})
export class RicercaComponent 
{
  userId: string = '';
  idCorso: string = '';
  searchQuery: string = '';
  listaCorsi: any[] = [];
  numeroRisultati: any;
  isIscritto: boolean = false;


  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {}

  ngOnInit(): void 
  {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      this.performSearch(this.searchQuery);
    });

    //ottengo l'idUtente e il Token dal Local Storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId != null) {this.userId = storedUserId;} 
    else {this.userId = 'idUtente non trovato';}
    // console.log('User ID:',storedUserId);    
  }

  performSearch(query: string): void 
  {
    this.dataService.getCoursesByName(query).subscribe({
      next: (data) => {
        this.listaCorsi = data; // Memorizza i dati dell'utente
        this.numeroRisultati = this.listaCorsi.length;
        console.log(this.listaCorsi);
      },
      error: (error) => {
        console.error('Errore ricerca del corso', error);
      }
    })

  console.log('Ricerca per:', query);
  }

  saveCourseId(courseId: string): void 
  {
    console.log('Saving Course ID:', courseId);
    localStorage.setItem('selectedCourseId', courseId);
  }

  checkIscrizioneCorso(idCorso: string, idUtente: string): void 
  {
    this.dataService.checkIscrizioneCorso(idCorso, idUtente).subscribe({
      next: (data) => {
        this.isIscritto = data;
        if (this.isIscritto == true)
        {
          this.router.navigate(['/corso']);
        }
        else
        {
          this.router.navigate(['/anteprimaCorso']);
        }
        console.log(this.isIscritto);
      },
      error: (error) => {
        console.error('Errore ricerca del corso', error);
      }
    })
  }
  
  handleCourseClick(idCorso: string, idUtente: string): void 
  {
    this.saveCourseId(idCorso);
    this.checkIscrizioneCorso(idCorso, idUtente);
  }
}
