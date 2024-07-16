import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvisoCancellazioneComponent } from './avviso-cancellazione.component';

describe('AvvisoCancellazioneComponent', () => {
  let component: AvvisoCancellazioneComponent;
  let fixture: ComponentFixture<AvvisoCancellazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvvisoCancellazioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvisoCancellazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
