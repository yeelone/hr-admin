import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoefficientSelectorComponent } from './coefficient-selector.component';

describe('CoefficientSelectorComponent', () => {
  let component: CoefficientSelectorComponent;
  let fixture: ComponentFixture<CoefficientSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoefficientSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoefficientSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
