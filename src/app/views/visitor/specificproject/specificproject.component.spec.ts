import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificprojectComponent } from './specificproject.component';

describe('SpecificprojectComponent', () => {
  let component: SpecificprojectComponent;
  let fixture: ComponentFixture<SpecificprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
