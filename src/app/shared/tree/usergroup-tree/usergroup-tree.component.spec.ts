import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupTreeComponent } from './usergroup-tree.component';

describe('UsergroupTreeComponent', () => {
  let component: UsergroupTreeComponent;
  let fixture: ComponentFixture<UsergroupTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergroupTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
