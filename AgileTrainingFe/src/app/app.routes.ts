import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { ProfiloUtenteComponent } from './components/profilo-utente/profilo-utente.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:"home", component: HomepageComponent},
    {path:"login", component: LoginComponent},
    {path:"profiloUtente", component: ProfiloUtenteComponent}
];
