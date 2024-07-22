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
  courses: any[] = [];
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void 
  {
    this.dataService.getAllCourses().subscribe({
      next: (data: any[]) => {
        this.courses = data;
      },
      error: (err: any) => {
        console.error('Errore nel recupero dei corsi', err);
        this.error = 'Errore nel recupero dei corsi';
      }
    });
  }
  
}
