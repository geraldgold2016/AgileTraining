import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordDimenticataComponent } from './password-dimenticata.component';

describe('PasswordDimenticataComponent', () => {
  let component: PasswordDimenticataComponent;
  let fixture: ComponentFixture<PasswordDimenticataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordDimenticataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordDimenticataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
