import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectForGroupedComponent } from './select-for-grouped.component';

describe('SelectForGroupedComponent', () => {
  let component: SelectForGroupedComponent;
  let fixture: ComponentFixture<SelectForGroupedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectForGroupedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectForGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
