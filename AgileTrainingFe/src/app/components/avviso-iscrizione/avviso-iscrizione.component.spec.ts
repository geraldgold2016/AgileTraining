import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoIscrizioneComponent } from './avviso-iscrizione.component';

describe('AvvisoIscrizioneComponent', () => {
  let component: AvvisoIscrizioneComponent;
  let fixture: ComponentFixture<AvvisoIscrizioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoIscrizioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoIscrizioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
