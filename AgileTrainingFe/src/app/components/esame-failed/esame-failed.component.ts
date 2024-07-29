import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-esame-failed',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './esame-failed.component.html',
  styleUrl: './esame-failed.component.css'
})
export class EsameFailedComponent implements OnInit
{
  punteggio: string = '';
  ngOnInit(): void 
  {
    const punteggio= localStorage.getItem('punteggio');
    if (punteggio)
    {
      this.punteggio = punteggio;
    }
  }
}
