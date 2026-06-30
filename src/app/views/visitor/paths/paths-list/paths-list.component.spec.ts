import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathsListComponent } from './paths-list.component';

describe('PathsListComponent', () => {
  let component: PathsListComponent;
  let fixture: ComponentFixture<PathsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
