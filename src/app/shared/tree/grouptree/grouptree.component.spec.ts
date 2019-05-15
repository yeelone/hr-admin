import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouptreeComponent } from './grouptree.component';

describe('GrouptreeComponent', () => {
  let component: GrouptreeComponent;
  let fixture: ComponentFixture<GrouptreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouptreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouptreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
