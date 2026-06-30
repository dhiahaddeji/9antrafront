import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactForumComponent } from './contact-forum.component';

describe('ContactForumComponent', () => {
  let component: ContactForumComponent;
  let fixture: ComponentFixture<ContactForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
