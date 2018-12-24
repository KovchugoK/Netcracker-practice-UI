import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStartupRoleComponent } from './change-startup-role.component';

describe('ChangeStartupRoleComponent', () => {
  let component: ChangeStartupRoleComponent;
  let fixture: ComponentFixture<ChangeStartupRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStartupRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStartupRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
