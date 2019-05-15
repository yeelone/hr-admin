import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupSelectorComponent } from './usergroup-selector.component';

describe('GroupSelectorComponent', () => {
  let component: UserGroupSelectorComponent;
  let fixture: ComponentFixture<UserGroupSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
