import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoPasswordSuccessComponent } from './avviso-password-success.component';

describe('AvvisoPasswordSuccessComponent', () => {
  let component: AvvisoPasswordSuccessComponent;
  let fixture: ComponentFixture<AvvisoPasswordSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoPasswordSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoPasswordSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
