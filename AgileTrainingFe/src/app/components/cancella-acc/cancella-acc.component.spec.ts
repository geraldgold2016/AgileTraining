import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellaAccComponent } from './cancella-acc.component';

describe('CancellaAccComponent', () => {
  let component: CancellaAccComponent;
  let fixture: ComponentFixture<CancellaAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellaAccComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellaAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
