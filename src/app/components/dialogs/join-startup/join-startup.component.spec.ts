import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinStartupComponent } from './join-startup.component';

describe('JoinStartupComponent', () => {
  let component: JoinStartupComponent;
  let fixture: ComponentFixture<JoinStartupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinStartupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
