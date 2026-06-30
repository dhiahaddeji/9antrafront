import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChatAllComponent } from './student-chat-all.component';

describe('StudentChatAllComponent', () => {
  let component: StudentChatAllComponent;
  let fixture: ComponentFixture<StudentChatAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentChatAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentChatAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
