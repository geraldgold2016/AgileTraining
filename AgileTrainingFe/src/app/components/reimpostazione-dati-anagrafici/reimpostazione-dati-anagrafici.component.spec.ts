import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimpostazioneDatiAnagraficiComponent } from './reimpostazione-dati-anagrafici.component';

describe('ReimpostazioneDatiAnagraficiComponent', () => {
  let component: ReimpostazioneDatiAnagraficiComponent;
  let fixture: ComponentFixture<ReimpostazioneDatiAnagraficiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReimpostazioneDatiAnagraficiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReimpostazioneDatiAnagraficiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
