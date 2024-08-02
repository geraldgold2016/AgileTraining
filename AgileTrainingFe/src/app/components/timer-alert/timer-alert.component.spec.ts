import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerAlertComponent } from './timer-alert.component';

describe('TimerAlertComponent', () => {
  let component: TimerAlertComponent;
  let fixture: ComponentFixture<TimerAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
