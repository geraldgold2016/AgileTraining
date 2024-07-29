import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdleService } from '../../idle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-warning',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule per usare *ngIf
  templateUrl: './session-warning.component.html',
  styleUrls: ['./session-warning.component.css']
})
export class SessionWarningComponent implements OnInit, OnDestroy {
  showWarning = false;
  countdown = 0;
  private warningSubscription: Subscription | undefined;

  constructor(private idleService: IdleService) {}

  ngOnInit() {
    this.warningSubscription = this.idleService.getWarningObservable().subscribe(remainingSeconds => {
      this.showWarning = true;
      this.countdown = remainingSeconds;
    });

    // Aggiungi i listener per gli eventi di attività dell'utente
    window.addEventListener('click', this.handleUserActivity);
    window.addEventListener('mousemove', this.handleUserActivity);
  }

  ngOnDestroy() {
    this.warningSubscription?.unsubscribe();
    
    // Rimuovi i listener per evitare perdite di memoria
    window.removeEventListener('click', this.handleUserActivity);
    window.removeEventListener('mousemove', this.handleUserActivity);
  }

  closeWarning() {
    this.showWarning = false;
  }

  // Metodo per gestire l'attività dell'utente
  private handleUserActivity = () => {
    this.closeWarning();
    // Eventualmente puoi anche reimpostare il timer della sessione qui se necessario
  }
}
