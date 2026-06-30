import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreamSectionComponent } from './tream-section.component';

describe('TreamSectionComponent', () => {
  let component: TreamSectionComponent;
  let fixture: ComponentFixture<TreamSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreamSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreamSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
