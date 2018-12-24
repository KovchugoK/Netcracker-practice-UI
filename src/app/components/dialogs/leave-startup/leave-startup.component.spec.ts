import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveStartupComponent } from './leave-startup.component';

describe('LeaveStartupComponent', () => {
  let component: LeaveStartupComponent;
  let fixture: ComponentFixture<LeaveStartupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveStartupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
