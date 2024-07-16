import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorsiSearchComponent } from './corsi-search.component';

describe('CorsiSearchComponent', () => {
  let component: CorsiSearchComponent;
  let fixture: ComponentFixture<CorsiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorsiSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorsiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
