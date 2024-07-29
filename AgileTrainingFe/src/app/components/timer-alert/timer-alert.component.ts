import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdleService } from '../../idle.service'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-timer-alert',
  templateUrl: './timer-alert.component.html',
  styleUrls: ['./timer-alert.component.css']
})
export class TimerAlertComponent implements OnInit, OnDestroy {
  countdown = 0;
  private warningSubscription: Subscription | undefined;

  constructor(private idleService: IdleService) {}

  ngOnInit() {
    this.warningSubscription = this.idleService.getWarningObservable().subscribe(remainingSeconds => {
      this.countdown = remainingSeconds;
    });
  }

  ngOnDestroy() {
    this.warningSubscription?.unsubscribe();
  }
}
