import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulodatiComponent } from './modulodati.component';

describe('ModulodatiComponent', () => {
  let component: ModulodatiComponent;
  let fixture: ComponentFixture<ModulodatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulodatiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulodatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
