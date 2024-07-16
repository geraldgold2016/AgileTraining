import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsameComponent } from './esame.component';

describe('EsameComponent', () => {
  let component: EsameComponent;
  let fixture: ComponentFixture<EsameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
