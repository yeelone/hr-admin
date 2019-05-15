import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFieldMultiSelectorComponent } from './template-field-multi-selector.component';

describe('TemplateFieldMultiSelectorComponent', () => {
  let component: TemplateFieldMultiSelectorComponent;
  let fixture: ComponentFixture<TemplateFieldMultiSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFieldMultiSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFieldMultiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
