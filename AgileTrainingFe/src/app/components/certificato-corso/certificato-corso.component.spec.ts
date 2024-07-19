import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatoCorsoComponent } from './certificato-corso.component';

describe('CertificatoCorsoComponent', () => {
  let component: CertificatoCorsoComponent;
  let fixture: ComponentFixture<CertificatoCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatoCorsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatoCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
