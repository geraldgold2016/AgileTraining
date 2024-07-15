import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoRegistrazioneComponent } from './avviso-registrazione.component';

describe('AvvisoRegistrazioneComponent', () => {
  let component: AvvisoRegistrazioneComponent;
  let fixture: ComponentFixture<AvvisoRegistrazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoRegistrazioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoRegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
