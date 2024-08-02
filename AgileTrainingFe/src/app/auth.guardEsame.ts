import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuardEsame: CanActivateFn = () => {
  const router = inject(Router);

  // Verifica se il flag per l'inizio dell'esame è presente nel localStorage
  const esameIniziato = localStorage.getItem('esameIniziato') == 'true';

  if (esameIniziato) 
  {
    return true; // Permetti l'accesso se l'esame è stato avviato
  } 
  else 
  {
    router.navigate(['/corso']);
    return false;
  }
};