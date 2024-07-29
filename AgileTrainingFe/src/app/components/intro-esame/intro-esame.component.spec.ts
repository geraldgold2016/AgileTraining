import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroEsameComponent } from './intro-esame.component';

describe('IntroEsameComponent', () => {
  let component: IntroEsameComponent;
  let fixture: ComponentFixture<IntroEsameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroEsameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroEsameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
