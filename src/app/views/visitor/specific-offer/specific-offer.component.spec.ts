import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificOfferComponent } from './specific-offer.component';

describe('SpecificOfferComponent', () => {
  let component: SpecificOfferComponent;
  let fixture: ComponentFixture<SpecificOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
