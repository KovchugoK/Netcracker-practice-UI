import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelResumeComponent } from './cancel-resume.component';

describe('CancelResumeComponent', () => {
  let component: CancelResumeComponent;
  let fixture: ComponentFixture<CancelResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
