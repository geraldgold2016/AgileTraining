import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoIscrizioneCorsoAnnullatoComponent } from './avviso-iscrizione-corso-annullato.component';

describe('AvvisoIscrizioneCorsoAnnullatoComponent', () => {
  let component: AvvisoIscrizioneCorsoAnnullatoComponent;
  let fixture: ComponentFixture<AvvisoIscrizioneCorsoAnnullatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoIscrizioneCorsoAnnullatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoIscrizioneCorsoAnnullatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
