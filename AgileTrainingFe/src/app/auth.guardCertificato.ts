import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DataService } from './data.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const authGuardCertificato: CanActivateFn = () => {
  const router = inject(Router);
  const dataService = inject(DataService);

  var userId = '';
  var idCorso = '';

  // Verifica se il certificato esiste per la pagina `certificatoCorso`
    //ottengo l'idUtente e il Token dal Local Storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId != null) {userId = storedUserId;} 
    else {userId = 'idUtente non trovato';}
    console.log('User ID:',storedUserId);    

    //ottengo l'idCorso dal Local Storage
    const storedCorsoId = localStorage.getItem('selectedCourseId');
    if (storedCorsoId != null) {idCorso = storedCorsoId;} 
    else {idCorso = 'idCorso non trovato';}
    console.log('Corso ID:',storedCorsoId);   
  // Verifica se idCorso e userId sono validi
  if (!idCorso || !userId) 
  {
    router.navigate(['/corso']);
    return of(false); // Impedisce l'accesso se idCorso o userId non sono validi
  }

  return dataService.checkCertificate(idCorso, userId).pipe(
    map((response: any) => {
      if (response == true) 
      {
        return true; // Permetti l'accesso se il certificato esiste
      } 
      else 
      {
        router.navigate(['/corso']);
        return false; // Impedisce l'accesso se il certificato non esiste
      }
    }),
    catchError((error) => {
      console.error('Errore nella verifica del certificato:', error);
      router.navigate(['/corso']);
      return of(false); // Impedisce l'accesso in caso di errore
    })
  );
};
