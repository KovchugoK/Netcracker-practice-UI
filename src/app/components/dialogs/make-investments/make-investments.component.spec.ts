import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeInvestmentsComponent } from './make-investments.component';

describe('MakeInvestmentsComponent', () => {
  let component: MakeInvestmentsComponent;
  let fixture: ComponentFixture<MakeInvestmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeInvestmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
