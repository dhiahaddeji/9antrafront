import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSidebarComponent } from './coach-sidebar.component';

describe('CoachSidebarComponent', () => {
  let component: CoachSidebarComponent;
  let fixture: ComponentFixture<CoachSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
