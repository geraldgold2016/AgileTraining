import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { IdleService } from './idle.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SessionWarningComponent } from './components/session-warning/session-warning.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,SessionWarningComponent,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private warningSubscription: Subscription | undefined;
  private sessionTimeoutSubscription: Subscription | undefined;
  isAuthPage: boolean = false;

  constructor(private idleService: IdleService, private router: Router) {}

  ngOnInit(): void {
    // Monitor routing events to check if the user is on an auth page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Controllo se l'URL è uno degli URL esatti
        const staticAuthPages = ['/login', '/logout', '/introEsame'];
      
        // Controllo se l'URL inizia con "/esame/"
        const isDynamicEsamePage = event.urlAfterRedirects.startsWith('/esame/');
  
        // Determina se si tratta di una auth page
        this.isAuthPage = staticAuthPages.includes(event.urlAfterRedirects) || isDynamicEsamePage;
  
        if (this.isAuthPage) {
          // On auth pages, do not start the idle service or add activity listeners
          this.stopIdleService();
        } else {
          // On non-auth pages, start the idle service and add activity listeners
          this.startIdleService();
        }
      }
    });

    // Check and apply dark mode
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark-mode') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  private startIdleService() {
    this.idleService.startWarningTimer();

    // Subscribe to session timeout and warning observables
    this.sessionTimeoutSubscription = this.idleService.getSessionTimeoutObservable().subscribe(() => {
      this.idleService.resetSession();
    });

    this.warningSubscription = this.idleService.getWarningObservable().subscribe();

    // Add activity listeners
    ['click', 'mousemove', 'keydown'].forEach(event =>
      window.addEventListener(event, () => this.idleService.updateLastActivityTime())
    );
  }

  private stopIdleService() {
    // Unsubscribe from idle service observables and remove activity listeners
    this.sessionTimeoutSubscription?.unsubscribe();
    this.warningSubscription?.unsubscribe();

    // Remove activity listeners
    ['click', 'mousemove', 'keydown'].forEach(event =>
      window.removeEventListener(event, () => this.idleService.updateLastActivityTime())
    );
  }

  ngOnDestroy() {
    this.stopIdleService(); // Ensure the idle service is stopped on destroy
  }
}