import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCorsoComponent } from './preview-corso.component';

describe('PreviewCorsoComponent', () => {
  let component: PreviewCorsoComponent;
  let fixture: ComponentFixture<PreviewCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewCorsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
