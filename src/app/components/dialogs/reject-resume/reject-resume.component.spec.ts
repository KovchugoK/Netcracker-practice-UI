import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectResumeComponent } from './reject-resume.component';

describe('RejectResumeComponent', () => {
  let component: RejectResumeComponent;
  let fixture: ComponentFixture<RejectResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
