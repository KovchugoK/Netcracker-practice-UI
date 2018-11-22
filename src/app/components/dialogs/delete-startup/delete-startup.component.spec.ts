import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStartupComponent } from './delete-startup.component';

describe('DeleteStartupComponent', () => {
  let component: DeleteStartupComponent;
  let fixture: ComponentFixture<DeleteStartupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteStartupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
