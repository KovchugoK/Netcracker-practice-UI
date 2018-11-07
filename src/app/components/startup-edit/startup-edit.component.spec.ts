import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupEditComponent } from './startup-edit.component';

describe('StartupEditComponent', () => {
  let component: StartupEditComponent;
  let fixture: ComponentFixture<StartupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
