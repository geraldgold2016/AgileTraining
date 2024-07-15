import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimpostaUsernameComponent } from './reimposta-username.component';

describe('ReimpostaUsernameComponent', () => {
  let component: ReimpostaUsernameComponent;
  let fixture: ComponentFixture<ReimpostaUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReimpostaUsernameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReimpostaUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
