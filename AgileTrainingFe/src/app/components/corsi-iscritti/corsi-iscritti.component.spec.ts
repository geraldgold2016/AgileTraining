import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorsiIscrittiComponent } from './corsi-iscritti.component';

describe('CorsiIscrittiComponent', () => {
  let component: CorsiIscrittiComponent;
  let fixture: ComponentFixture<CorsiIscrittiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorsiIscrittiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorsiIscrittiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
