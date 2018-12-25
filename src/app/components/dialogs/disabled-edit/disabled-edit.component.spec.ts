import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledEditComponent } from './disabled-edit.component';

describe('DisabledEditComponent', () => {
  let component: DisabledEditComponent;
  let fixture: ComponentFixture<DisabledEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
