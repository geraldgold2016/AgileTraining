import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoLogoutComponent } from './avviso-logout.component';

describe('AvvisoLogoutComponent', () => {
  let component: AvvisoLogoutComponent;
  let fixture: ComponentFixture<AvvisoLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoLogoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
