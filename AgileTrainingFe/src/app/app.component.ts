import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { IdleService } from './idle.service';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SessionWarningComponent } from './components/session-warning/session-warning.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent, LoginComponent, SessionWarningComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private warningSubscription: Subscription | undefined;
  private sessionTimeoutSubscription: Subscription | undefined;

  constructor(private idleService: IdleService, private router: Router) {}

  ngOnInit(): void {
    if (this.router.url !== '/login') {
      // Avvia il timer per il warning
      this.idleService.startWarningTimer();

      // Sottoscrivi all'observable per il timeout della sessione
      this.sessionTimeoutSubscription = this.idleService.getSessionTimeoutObservable().subscribe(() => {
        this.idleService.resetSession();
      });

      // Sottoscrivi all'observable per il countdown del warning
      this.warningSubscription = this.idleService.getWarningObservable().subscribe();


      
        const savedMode = localStorage.getItem('mode');
        if (savedMode === 'dark-mode') {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
    
    }

    this.addActivityListeners();
  }

  private addActivityListeners() {
    if (this.router.url !== '/login') {
      ['click', 'mousemove', 'keydown'].forEach(event => {
        window.addEventListener(event, () => this.idleService.updateLastActivityTime());
      });
    }
  }

  ngOnDestroy() {
    this.sessionTimeoutSubscription?.unsubscribe();
    this.warningSubscription?.unsubscribe();
  }
}
