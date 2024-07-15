import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoProfiloComponent } from './foto-profilo.component';

describe('FotoProfiloComponent', () => {
  let component: FotoProfiloComponent;
  let fixture: ComponentFixture<FotoProfiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotoProfiloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoProfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
