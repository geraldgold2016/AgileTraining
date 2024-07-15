import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsameSuccessComponent } from './esame-success.component';

describe('EsameSuccessComponent', () => {
  let component: EsameSuccessComponent;
  let fixture: ComponentFixture<EsameSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsameSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsameSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
