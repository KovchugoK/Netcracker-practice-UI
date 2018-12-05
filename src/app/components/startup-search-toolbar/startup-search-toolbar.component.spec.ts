import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupSearchToolbarComponent } from './startup-search-toolbar.component';

describe('StartupSearchToolbarComponent', () => {
  let component: StartupSearchToolbarComponent;
  let fixture: ComponentFixture<StartupSearchToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupSearchToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupSearchToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
