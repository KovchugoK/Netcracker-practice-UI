import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptResumeComponent } from './accept-resume.component';

describe('AcceptResumeComponent', () => {
  let component: AcceptResumeComponent;
  let fixture: ComponentFixture<AcceptResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
