import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResumeFromStartupComponent } from './delete-resume-from-startup.component';

describe('DeleteResumeFromStartupComponent', () => {
  let component: DeleteResumeFromStartupComponent;
  let fixture: ComponentFixture<DeleteResumeFromStartupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteResumeFromStartupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteResumeFromStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
