import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumecoachComponent } from './resumecoach.component';

describe('ResumecoachComponent', () => {
  let component: ResumecoachComponent;
  let fixture: ComponentFixture<ResumecoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumecoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumecoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
