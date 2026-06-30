import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPathsListComponent } from './admin-paths-list.component';

describe('AdminPathsListComponent', () => {
  let component: AdminPathsListComponent;
  let fixture: ComponentFixture<AdminPathsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPathsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPathsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
