import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent implements OnInit {
  isExpanded: boolean = false;
  dropdownOpen: boolean = false;

  ngOnInit(): void {
  }

  toggleNavbar() {
      this.isExpanded = !this.isExpanded;
  }

  toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
  }
}