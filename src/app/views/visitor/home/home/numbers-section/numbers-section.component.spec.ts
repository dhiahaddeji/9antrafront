import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersSectionComponent } from './numbers-section.component';

describe('NumbersSectionComponent', () => {
  let component: NumbersSectionComponent;
  let fixture: ComponentFixture<NumbersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumbersSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumbersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
