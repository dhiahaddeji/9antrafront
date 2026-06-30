import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathsUpdateFormComponent } from './admin-paths-update-form.component';

describe('AdminPathsUpdateFormComponent', () => {
  let component: AdminPathsUpdateFormComponent;
  let fixture: ComponentFixture<AdminPathsUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPathsUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPathsUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
