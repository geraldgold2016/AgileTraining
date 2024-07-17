import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { ProfiloUtenteComponent } from './components/profilo-utente/profilo-utente.component';
import { CorsiComponent } from './components/corsi/corsi.component';
import { ChiSiamoComponent } from './components/chi-siamo/chi-siamo.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:"home", component: HomepageComponent},
    {path:"login", component: LoginComponent},
    {path:"corsi", component: CorsiComponent},
    {path:"chiSiamo", component: ChiSiamoComponent},
    {path:"profiloUtente", component: ProfiloUtenteComponent}
];
