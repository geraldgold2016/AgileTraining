import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Importa il modulo di routing

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Fornisce HttpClientModule
    provideRouter(routes), // Fornisce la configurazione delle rotte
    // Aggiungi altri provider se necessari
  ],
};
