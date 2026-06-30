import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSpecificOfferComponent } from './details-specific-offer.component';

describe('DetailsSpecificOfferComponent', () => {
  let component: DetailsSpecificOfferComponent;
  let fixture: ComponentFixture<DetailsSpecificOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSpecificOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSpecificOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
