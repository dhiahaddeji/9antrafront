import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificprojectDetailsComponent } from './specificproject-details.component';

describe('SpecificprojectDetailsComponent', () => {
  let component: SpecificprojectDetailsComponent;
  let fixture: ComponentFixture<SpecificprojectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificprojectDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificprojectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
