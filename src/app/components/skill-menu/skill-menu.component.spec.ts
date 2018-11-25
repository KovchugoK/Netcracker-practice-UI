import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillMenuComponent } from './skill-menu.component';

describe('SkillMenuComponent', () => {
  let component: SkillMenuComponent;
  let fixture: ComponentFixture<SkillMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
