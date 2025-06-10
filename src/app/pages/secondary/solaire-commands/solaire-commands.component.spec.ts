import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolaireCommandsComponent } from './solaire-commands.component';

describe('SolaireCommandsComponent', () => {
  let component: SolaireCommandsComponent;
  let fixture: ComponentFixture<SolaireCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolaireCommandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolaireCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
