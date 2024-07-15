import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsameFailedComponent } from './esame-failed.component';

describe('EsameFailedComponent', () => {
  let component: EsameFailedComponent;
  let fixture: ComponentFixture<EsameFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsameFailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsameFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
