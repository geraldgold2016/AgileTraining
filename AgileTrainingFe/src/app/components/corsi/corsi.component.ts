import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../data.service'; // Importa il servizio
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corsi',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './corsi.component.html',
  styleUrl: './corsi.component.css'
})
export class CorsiComponent 
{
  coursesFrontEnd: any[] = [];
  coursesBackEnd: any[] = [];
  coursesDatabase: any[] = [];
  primi4CorsiFront: any[] = [];
  primi4CorsiBack: any[] = [];
  primi4CorsiData: any[] = [];
  error: string | null = null;

  constructor(private dataService: DataService) {}



  ngOnInit(): void 
  {
    this.dataService.getCoursesByCategory("FrontEnd").subscribe({
      next: (data: any[]) => {
        this.coursesFrontEnd = data;
        for (var i = 0; i < 4; i++)
        {
          this.primi4CorsiFront[i] = data[i];
        }
        console.log(this.coursesFrontEnd);
        console.log(this.primi4CorsiFront);
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });
    this.dataService.getCoursesByCategory("BackEnd").subscribe({
      next: (data: any[]) => {
        this.coursesBackEnd = data;
        for (var i = 0; i < 4; i++)
        {
          this.primi4CorsiBack[i] = data[i];
        }
        console.log(this.primi4CorsiBack);
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });
    this.dataService.getCoursesByCategory("Database").subscribe({
      next: (data: any[]) => {
        this.coursesDatabase = data;
        for (var i = 0; i < 4; i++)
        {
          this.primi4CorsiData[i] = data[i];
        }
        console.log(this.primi4CorsiData);
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });
  }


  VediCorsiFrontEnd()
  {
    const contenitoreCategorie = document.querySelector<HTMLElement>("#contenitoreCategorie");
    const corsiFrontEnd = document.querySelector<HTMLElement>("#corsiFrontEnd");
    const titolo = document.querySelector<HTMLElement>("h1");
    const tornaIndietro = document.querySelector<HTMLElement>(".TornaIndietro");

    if (titolo && contenitoreCategorie && corsiFrontEnd && tornaIndietro) 
    {
      titolo.innerHTML = "Tutti i corsi di FrontEnd";
      contenitoreCategorie.style.display = 'none';  
      corsiFrontEnd.style.display = 'block'; 
      tornaIndietro.style.display = 'block';
    }
  }
  VediCorsiBackEnd()
  {
    const contenitoreCategorie = document.querySelector<HTMLElement>("#contenitoreCategorie");
    const corsiBackEnd = document.querySelector<HTMLElement>("#corsiBackEnd");
    const titolo = document.querySelector<HTMLElement>("h1");
    const tornaIndietro = document.querySelector<HTMLElement>(".TornaIndietro");

    if (titolo && contenitoreCategorie && corsiBackEnd && tornaIndietro) 
    {
      titolo.innerHTML = "Tutti i corsi di BackEnd";
      contenitoreCategorie.style.display = 'none';  
      corsiBackEnd.style.display = 'block'; 
      tornaIndietro.style.display = 'block';    
    }
  }
  VediCorsiDatabase()
  {
    const contenitoreCategorie = document.querySelector<HTMLElement>("#contenitoreCategorie");
    const corsiDatabase = document.querySelector<HTMLElement>("#corsiDatabase");
    const titolo = document.querySelector<HTMLElement>("h1");
    const tornaIndietro = document.querySelector<HTMLElement>(".TornaIndietro");

    if (titolo && contenitoreCategorie && corsiDatabase && tornaIndietro) 
    {
      titolo.innerHTML = "Tutti i corsi di Database";
      contenitoreCategorie.style.display = 'none';  
      corsiDatabase.style.display = 'block'; 
      tornaIndietro.style.display = 'block';    
    }
  }

  TornaIndietro() 
  {
    const contenitoreCategorie = document.querySelector<HTMLElement>("#contenitoreCategorie");
    const corsiFrontEnd = document.querySelector<HTMLElement>("#corsiFrontEnd");
    const corsiBackEnd = document.querySelector<HTMLElement>("#corsiBackEnd");
    const corsiDatabase = document.querySelector<HTMLElement>("#corsiDatabase");
    const titolo = document.querySelector<HTMLElement>("h1");
    const tornaIndietro = document.querySelector<HTMLElement>(".TornaIndietro");

    if (titolo && contenitoreCategorie && corsiFrontEnd && corsiBackEnd && corsiDatabase && tornaIndietro) 
    {
      titolo.innerHTML = "Tutti i corsi";
      contenitoreCategorie.style.display = 'flex';
      corsiFrontEnd.style.display = 'none';
      corsiBackEnd.style.display = 'none';
      corsiDatabase.style.display = 'none';
      tornaIndietro.style.display = 'none';
    }
  }

}
