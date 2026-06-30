import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachEditprofileComponent } from './coach-editprofile.component';

describe('CoachEditprofileComponent', () => {
  let component: CoachEditprofileComponent;
  let fixture: ComponentFixture<CoachEditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachEditprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
