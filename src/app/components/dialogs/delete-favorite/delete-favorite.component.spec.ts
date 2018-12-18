import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFavoriteComponent } from './delete-favorite.component';

describe('DeleteFavoriteComponent', () => {
  let component: DeleteFavoriteComponent;
  let fixture: ComponentFixture<DeleteFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
