import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectsComponent } from './update-projects.component';

describe('UpdateProjectsComponent', () => {
  let component: UpdateProjectsComponent;
  let fixture: ComponentFixture<UpdateProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
