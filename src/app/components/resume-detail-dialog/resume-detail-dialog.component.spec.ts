import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDetailDialogComponent } from './resume-detail-dialog.component';

describe('ResumeDetailDialogComponent', () => {
  let component: ResumeDetailDialogComponent;
  let fixture: ComponentFixture<ResumeDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
