import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationCardComponent } from './facturation-card.component';

describe('FacturationCardComponent', () => {
  let component: FacturationCardComponent;
  let fixture: ComponentFixture<FacturationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
