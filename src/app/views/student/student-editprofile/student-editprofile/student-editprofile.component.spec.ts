import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEditprofileComponent } from './student-editprofile.component';

describe('StudentEditprofileComponent', () => {
  let component: StudentEditprofileComponent;
  let fixture: ComponentFixture<StudentEditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEditprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
