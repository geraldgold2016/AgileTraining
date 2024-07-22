import { Component } from '@angular/core';

@Component({
  selector: 'app-reimposta-username',
  standalone: true,
  imports: [],
  templateUrl: './reimposta-username.component.html',
  styleUrl: './reimposta-username.component.css'
})
export class ReimpostaUsernameComponent {

  
  
  
    passFun(): void {
      const passwordField = document.getElementById("passInp") as HTMLInputElement;
  
      if (passwordField.type === "password") {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
  
  
  
  
  
  }
  


}
