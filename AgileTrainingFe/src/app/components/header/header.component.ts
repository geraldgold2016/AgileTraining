import { Component } from '@angular/core';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent 
{
  ngOnInit(): void 
  {
    const hamburger = document.querySelector(".hamburger");
    const navItems = document.querySelectorAll<HTMLElement>(".navbar-item");

    if (hamburger && navItems.length > 0) 
    {
      hamburger.addEventListener("click", () => {
        navItems.forEach(navItem => {
          navItem.classList.toggle('active');
          // console.log(navItems);
        });
      });
    } 
    else 
    {
      console.error("Gli elementi 'navbar-item' o l'elemento 'hamburger' non sono stati trovati");
    }
  }

 
  
}
