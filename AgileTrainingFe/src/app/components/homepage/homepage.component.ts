import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initToggle('MostraAltro1', 'corsoIscritto');
    this.initToggle('MostraAltro2', 'corsoInteressante');
    this.initCarousel('corsiIscrittiCarousel');
    this.initCarousel('corsiInteressantiCarousel');
  }

  private initToggle(buttonId: string, itemClass: string): void {
    const button = document.querySelector(`#${buttonId}`) as HTMLButtonElement;
    const items = document.querySelectorAll<HTMLElement>(`.${itemClass}`);

    if (button && items.length > 0) {
      button.addEventListener('click', () => {
        const isShowingMore = button.innerHTML === 'Mostra Altro';
        button.innerHTML = isShowingMore ? 'Mostra meno' : 'Mostra Altro';
        items.forEach(item => item.classList.toggle('active'));
      });
    } else {
      console.error(`Il pulsante con ID ${buttonId} o gli elementi con classe ${itemClass} non sono stati trovati`);
    }
  }

  private initCarousel(carouselId: string): void {
    const container = document.querySelector(`#${carouselId}`);
    const prevButton = container?.querySelector('.carousel-button.prev');
    const nextButton = container?.querySelector('.carousel-button.next');
    const carousel = container?.querySelector('.carousel') as HTMLElement;

    if (prevButton && nextButton && carousel) {
      prevButton.addEventListener('click', () => {
        this.scrollCarousel(carousel, -1);
      });

      nextButton.addEventListener('click', () => {
        this.scrollCarousel(carousel, 1);
      });
    } else {
      console.error(`Il contenitore del carosello o i pulsanti non sono stati trovati per ${carouselId}`);
    }
  }

  private scrollCarousel(carousel: HTMLElement, direction: number): void {
    carousel.scrollBy({
      left: direction * carousel.clientWidth,
      behavior: 'smooth'
    });
  }
}
