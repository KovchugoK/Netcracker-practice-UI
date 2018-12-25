import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsSearchToolbarComponent } from './contacts-search-toolbar.component';

describe('ContactsSearchToolbarComponent', () => {
  let component: ContactsSearchToolbarComponent;
  let fixture: ComponentFixture<ContactsSearchToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsSearchToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsSearchToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
