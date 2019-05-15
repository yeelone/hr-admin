import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTreeSelectorComponent } from './group-tree-selector.component';

describe('GroupTreeSelectorComponent', () => {
  let component: GroupTreeSelectorComponent;
  let fixture: ComponentFixture<GroupTreeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTreeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTreeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
