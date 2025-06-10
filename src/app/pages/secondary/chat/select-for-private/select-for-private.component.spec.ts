import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectForPrivateComponent } from './select-for-private.component';

describe('SelectForPrivateComponent', () => {
  let component: SelectForPrivateComponent;
  let fixture: ComponentFixture<SelectForPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectForPrivateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectForPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
