import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent 
{
  constructor(library: FaIconLibrary, 
    private dataService: DataService,
    private router: Router,
    private userService: UserService) 
  {library.addIconPacks(fas);}
  
  showPassword: boolean = false;

  togglePasswordVisibility() 
  {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('.passInp') as HTMLInputElement;
    if (this.showPassword) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  risposta: { userId: string, token: string } = {userId: '', token: '' }


  Login() 
  {
    this.dataService.login(this.username, this.password).subscribe({
      next: (data: { userId: string, token: string }) => {
        this.risposta = data;
        if (this.risposta) 
        {
          localStorage.setItem('userId', this.risposta.userId);
          localStorage.setItem('authToken', this.risposta.token);
          // console.log(this.risposta);
          // console.log(this.risposta.userId);
          // console.log(this.risposta.token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Login fallito';
          console.error('Login fallito');
        }
      },
      error: (err: any) => {
        this.errorMessage = 'Errore durante il login';
        console.error('Errore:', err);
      }
    });
  }

  usernamePattern = '^[a-zA-Z0-9-_]+$';  // Consente lettere, numeri, trattini e underscore
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%&!])[A-Za-z\\d@#$%&!]{8,}$'; // Almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale
  loginRequest = { username: '', password: '' };
  
  removeSpaces(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\s+/g, ''); // Rimuove tutti gli spazi
  }

  validateUsername(event: Event) {
    const input = event.target as HTMLInputElement;
    const pattern = new RegExp(this.usernamePattern);
    if (!pattern.test(input.value)) {
      input.value = input.value.replace(/[^a-zA-Z0-9-_]/g, ''); // Rimuove i caratteri non accettabili
    }
  }

validatePassword(event: Event) {
    const input = event.target as HTMLInputElement;
    const pattern = new RegExp(this.passwordPattern);
    if (!pattern.test(input.value)) {
      input.value = input.value.replace(/[^a-zA-Z0-9@#$%&!]/g, ''); // Rimuove i caratteri non accettabili
    }
  }

  @HostListener('document:copy', ['$event'])
  onCopy(event: ClipboardEvent): void 
  {
    const target = event.target as HTMLElement;
    if (target.closest('input') && (target as HTMLInputElement).type !== 'password') 
    {
      event.preventDefault();
    }
  }

  onSubmit() 
  {
    if (!this.loginRequest.username || !this.loginRequest.password) 
    {
      this.errorMessage = 'Please fill in both fields.';
      return;
    }
  }


}
