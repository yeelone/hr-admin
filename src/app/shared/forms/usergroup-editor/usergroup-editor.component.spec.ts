import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupEditorComponent } from './usergroup-editor.component';

describe('GroupEditorComponent', () => {
  let component: UserGroupEditorComponent;
  let fixture: ComponentFixture<UserGroupEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
