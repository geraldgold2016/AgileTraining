import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessioneComponent } from './sessione.component';

describe('SessioneComponent', () => {
  let component: SessioneComponent;
  let fixture: ComponentFixture<SessioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
