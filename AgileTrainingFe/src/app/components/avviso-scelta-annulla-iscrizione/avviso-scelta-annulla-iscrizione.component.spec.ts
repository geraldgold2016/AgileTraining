import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoSceltaAnnullaIscrizioneComponent } from './avviso-scelta-annulla-iscrizione.component';

describe('AvvisoSceltaAnnullaIscrizioneComponent', () => {
  let component: AvvisoSceltaAnnullaIscrizioneComponent;
  let fixture: ComponentFixture<AvvisoSceltaAnnullaIscrizioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoSceltaAnnullaIscrizioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoSceltaAnnullaIscrizioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
