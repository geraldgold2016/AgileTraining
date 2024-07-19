import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SessioneComponent } from './components/sessione/sessione.component';
import { AvvisoCambioFotoComponent } from './components/avviso-cambio-foto/avviso-cambio-foto.component';
import { AvvisoCancellazioneComponent } from './components/avviso-cancellazione/avviso-cancellazione.component';
import { AvvisoDatiAnagraficiComponent } from './components/avviso-dati-anagrafici/avviso-dati-anagrafici.component';
import { AvvisoIscrizioneComponent } from './components/avviso-iscrizione/avviso-iscrizione.component';
import { AvvisoPasswordSuccessComponent } from './components/avviso-password-success/avviso-password-success.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { AvvisoRegistrazioneComponent } from './components/avviso-registrazione/avviso-registrazione.component';
import { AvvisoUsernameSuccessComponent } from './components/avviso-username-success/avviso-username-success.component';
import { CambiaPasswordComponent } from './components/cambia-password/cambia-password.component';
import { CancellaAccountComponent } from './components/cancella-account/cancella-account.component';
import { CertificatiComponent } from './components/certificati/certificati.component';
import { ChiSiamoComponent } from './components/chi-siamo/chi-siamo.component';
import { CorsiComponent } from './components/corsi/corsi.component';
import { CorsiSearchComponent } from './components/corsi-search/corsi-search.component';
import { CorsoComponent } from './components/corso/corso.component';
import { DatiUtenteComponent } from './components/dati-utente/dati-utente.component';
import { EsameComponent } from './components/esame/esame.component';
import { EsameFailedComponent } from './components/esame-failed/esame-failed.component';
import { EsameSuccessComponent } from './components/esame-success/esame-success.component';
import { LinguaComponent } from './components/lingua/lingua.component';
import { LogoutSuccessComponent } from './components/logout-success/logout-success.component';
import { PasswordDimenticataComponent } from './components/password-dimenticata/password-dimenticata.component';
import { PreviewCorsoComponent } from './components/preview-corso/preview-corso.component';
import { ProfiloUtenteComponent } from './components/profilo-utente/profilo-utente.component';
import { ReimpostaUsernameComponent } from './components/reimposta-username/reimposta-username.component';
import { ReimpostazioneDatiAnagraficiComponent } from './components/reimpostazione-dati-anagrafici/reimpostazione-dati-anagrafici.component';
import { CertificatoCorsoComponent } from './components/certificato-corso/certificato-corso.component';
import { AvvisoSceltaAnnullaIscrizioneComponent } from './components/avviso-scelta-annulla-iscrizione/avviso-scelta-annulla-iscrizione.component';
import { AvvisoIscrizioneCorsoAnnullatoComponent } from './components/avviso-iscrizione-corso-annullato/avviso-iscrizione-corso-annullato.component';

export const routes: Routes = [
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"login",component:LoginComponent},
    {path:"sessione", component:SessioneComponent},
    {path:"avvisoFoto", component:AvvisoCambioFotoComponent},
    {path:"avvisocancellazione", component:AvvisoCancellazioneComponent},
    {path:"avvisoDati", component:AvvisoDatiAnagraficiComponent},
    {path:"avvisoIscrizione", component:AvvisoIscrizioneComponent},
    {path:"avvisoPass", component:AvvisoPasswordSuccessComponent},
    {path:"registrazione", component:RegistrazioneComponent},
    {path:"avvisoRegister", component:AvvisoRegistrazioneComponent},
    {path:"avvisoUsernameSuccess", component:AvvisoUsernameSuccessComponent},
    {path:"avvisoSceltaAnnulaIscrizione", component:AvvisoSceltaAnnullaIscrizioneComponent},
    {path:"avvisoIscrizioneCorsoAnnullato", component:AvvisoIscrizioneCorsoAnnullatoComponent},
    {path:"cambioPassword", component:CambiaPasswordComponent},
    {path:"cancellaAccount", component:CancellaAccountComponent},
    {path:"certificati", component:CertificatiComponent},
    {path:"certificatoCorso", component:CertificatoCorsoComponent},
    {path:"chiSiamo", component:ChiSiamoComponent},
    {path:"corsi", component:CorsiComponent},
    {path:"cercaCorsi", component:CorsiSearchComponent},
    {path:"corso", component:CorsoComponent},
    {path:"datiUtente", component:DatiUtenteComponent},
    {path:"esame", component:EsameComponent},
    {path:"esameFail", component:EsameFailedComponent},
    {path:"esameSuccess", component:EsameSuccessComponent},
    {path:"home", component:HomepageComponent},
    {path:"lingua", component:LinguaComponent},
    {path:"passwordDimenticata", component:PasswordDimenticataComponent},
    {path:"anteprimaCorso", component:PreviewCorsoComponent},
    {path:"profiloUtente", component:ProfiloUtenteComponent},
    {path:"reimpostaUsername", component:ReimpostaUsernameComponent},
    {path:"reimpostaDatiAnagrafici", component:ReimpostazioneDatiAnagraficiComponent}
    
   
   
    

];
