import { Component } from '@angular/core';

@Component({
  selector: 'app-cambia-password',
  templateUrl: './cambia-password.component.html',
  styleUrls: ['./cambia-password.component.css'],
  standalone: true,
  imports: []
})
export class CambiaPasswordComponent {
  togglePasswordVisibility(id: string): void {
    const input = document.getElementById(id) as HTMLInputElement;
    const icon = document.querySelector(`#${id} + .eye-icon i`) as HTMLElement;
    
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
}
