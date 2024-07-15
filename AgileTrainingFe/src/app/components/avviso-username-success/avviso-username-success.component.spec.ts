import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoUsernameSuccessComponent } from './avviso-username-success.component';

describe('AvvisoUsernameSuccessComponent', () => {
  let component: AvvisoUsernameSuccessComponent;
  let fixture: ComponentFixture<AvvisoUsernameSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoUsernameSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoUsernameSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
