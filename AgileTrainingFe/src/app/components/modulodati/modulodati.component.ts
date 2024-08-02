import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modulodati',
  templateUrl: './modulodati.component.html',
  styleUrls: ['./modulodati.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule]
})
export class ModulodatiComponent implements OnInit {

  updateForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      profileImageUrl: ['', Validators.required],
      residentialAddress: ['', Validators.required],
      homeAddress: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    const userId = id ? +id : null;

    if (userId !== null) {
      this.fetchUserData(userId);
    } else {
      this.router.navigate(['/login']);
    }
  }

  fetchUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      data => {
        this.updateForm.patchValue(data);
      },
      error => {
        console.error('Errore nel caricamento dei dati utente', error);
      }
    );
  }

  confirmChanges(): void {
    if (confirm('Sei sicuro di voler aggiornare i dati?')) {
      this.submitUpdate();
    }
  }

  submitUpdate(): void {
    if (this.updateForm.valid) {
      const userId = this.getUserIdFromSession();
      if (userId !== null) {
        this.userService.updateUserData(userId, this.updateForm.value).subscribe(
          response => {
            this.successMessage = 'Dati aggiornati con successo';
            this.errorMessage = '';
          },
          error => {
            this.successMessage = '';
            this.errorMessage = 'Errore nell\'aggiornamento dei dati';
            console.error('Errore nell\'aggiornamento dei dati', error);
          }
        );
      }
    }
  }

  getUserIdFromSession(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
}
