import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachGroupsComponent } from './coach-groups.component';

describe('CoachGroupsComponent', () => {
  let component: CoachGroupsComponent;
  let fixture: ComponentFixture<CoachGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
