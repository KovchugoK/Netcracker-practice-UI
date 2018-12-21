import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KickMemberComponent } from './kick-member.component';

describe('KickMemberComponent', () => {
  let component: KickMemberComponent;
  let fixture: ComponentFixture<KickMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KickMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KickMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
