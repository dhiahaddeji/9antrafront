import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachChatAllComponent } from './coach-chat-all.component';

describe('CoachChatAllComponent', () => {
  let component: CoachChatAllComponent;
  let fixture: ComponentFixture<CoachChatAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachChatAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachChatAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
