import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellaAccountComponent } from './cancella-account.component';

describe('CancellaAccountComponent', () => {
  let component: CancellaAccountComponent;
  let fixture: ComponentFixture<CancellaAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellaAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellaAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
