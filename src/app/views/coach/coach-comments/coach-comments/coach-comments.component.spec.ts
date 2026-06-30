import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCommentsComponent } from './coach-comments.component';

describe('CoachCommentsComponent', () => {
  let component: CoachCommentsComponent;
  let fixture: ComponentFixture<CoachCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
