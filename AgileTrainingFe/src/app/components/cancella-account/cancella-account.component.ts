import { Component } from '@angular/core';

@Component({
  selector: 'app-cancella-account',
  standalone: true,
  imports: [],
  templateUrl: './cancella-account.component.html',
  styleUrl: './cancella-account.component.css'
})
export class CancellaAccountComponent {
  
  
    passFun(): void {
      const passwordField = document.getElementById("passInp") as HTMLInputElement;
  
      if (passwordField.type === "password") {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
  
  
  
  } 
  
  }
  
