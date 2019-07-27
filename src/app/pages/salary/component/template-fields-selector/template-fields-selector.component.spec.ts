import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFieldsSelectorComponent } from './template-fields-selector.component';

describe('TemplateFieldsSelectorComponent', () => {
  let component: TemplateFieldsSelectorComponent;
  let fixture: ComponentFixture<TemplateFieldsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFieldsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFieldsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
