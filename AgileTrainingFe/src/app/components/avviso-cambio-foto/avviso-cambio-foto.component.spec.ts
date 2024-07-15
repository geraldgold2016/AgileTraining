import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoCambioFotoComponent } from './avviso-cambio-foto.component';

describe('AvvisoCambioFotoComponent', () => {
  let component: AvvisoCambioFotoComponent;
  let fixture: ComponentFixture<AvvisoCambioFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoCambioFotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoCambioFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
