import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoSceltaCancComponent } from './avviso-scelta-canc.component';

describe('AvvisoSceltaCancComponent', () => {
  let component: AvvisoSceltaCancComponent;
  let fixture: ComponentFixture<AvvisoSceltaCancComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoSceltaCancComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoSceltaCancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
