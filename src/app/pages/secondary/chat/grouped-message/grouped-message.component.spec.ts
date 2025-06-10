import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedMessageComponent } from './grouped-message.component';

describe('GroupedMessageComponent', () => {
  let component: GroupedMessageComponent;
  let fixture: ComponentFixture<GroupedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupedMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
