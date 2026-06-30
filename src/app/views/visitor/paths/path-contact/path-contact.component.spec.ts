import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathContactComponent } from './path-contact.component';

describe('PathContactComponent', () => {
  let component: PathContactComponent;
  let fixture: ComponentFixture<PathContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
