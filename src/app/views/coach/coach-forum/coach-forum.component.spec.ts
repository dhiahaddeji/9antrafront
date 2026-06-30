import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachForumComponent } from './coach-forum.component';

describe('CoachForumComponent', () => {
  let component: CoachForumComponent;
  let fixture: ComponentFixture<CoachForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
