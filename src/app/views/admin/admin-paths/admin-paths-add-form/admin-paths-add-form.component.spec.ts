import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathsAddFormComponent } from './admin-paths-add-form.component';

describe('AdminPathsAddFormComponent', () => {
  let component: AdminPathsAddFormComponent;
  let fixture: ComponentFixture<AdminPathsAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPathsAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPathsAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
