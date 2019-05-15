import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleUserListComponent } from './simple-user-list.component';

describe('SimpleUserListComponent', () => {
  let component: SimpleUserListComponent;
  let fixture: ComponentFixture<SimpleUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
