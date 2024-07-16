import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutSuccessComponent } from './logout-success.component';

describe('LogoutSuccessComponent', () => {
  let component: LogoutSuccessComponent;
  let fixture: ComponentFixture<LogoutSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
