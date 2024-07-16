import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinguaComponent } from './lingua.component';

describe('LinguaComponent', () => {
  let component: LinguaComponent;
  let fixture: ComponentFixture<LinguaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinguaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
