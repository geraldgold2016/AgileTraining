import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoDatiAnagraficiComponent } from './avviso-dati-anagrafici.component';

describe('AvvisoDatiAnagraficiComponent', () => {
  let component: AvvisoDatiAnagraficiComponent;
  let fixture: ComponentFixture<AvvisoDatiAnagraficiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoDatiAnagraficiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoDatiAnagraficiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
