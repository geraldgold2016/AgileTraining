import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiAnagraficiComponent } from './dati-anagrafici.component';

describe('DatiAnagraficiComponent', () => {
  let component: DatiAnagraficiComponent;
  let fixture: ComponentFixture<DatiAnagraficiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatiAnagraficiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatiAnagraficiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
