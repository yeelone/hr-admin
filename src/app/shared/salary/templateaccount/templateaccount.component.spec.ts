import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateaccountComponent } from './templateaccount.component';

describe('TemplateaccountComponent', () => {
  let component: TemplateaccountComponent;
  let fixture: ComponentFixture<TemplateaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
