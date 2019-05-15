import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTagRuleEditorComponent } from './group-tag-rule-editor.component';

describe('GroupTagRuleEditorComponent', () => {
  let component: GroupTagRuleEditorComponent;
  let fixture: ComponentFixture<GroupTagRuleEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTagRuleEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTagRuleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
