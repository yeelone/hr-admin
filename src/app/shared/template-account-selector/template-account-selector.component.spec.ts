import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAccountSelectorComponent } from './template-account-selector.component';

describe('TemplateAccountSelectorComponent', () => {
  let component: TemplateAccountSelectorComponent;
  let fixture: ComponentFixture<TemplateAccountSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAccountSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAccountSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
