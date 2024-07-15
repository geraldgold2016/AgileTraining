import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatiComponent } from './certificati.component';

describe('CertificatiComponent', () => {
  let component: CertificatiComponent;
  let fixture: ComponentFixture<CertificatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
