import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildinfuncSelectorComponent } from './buildinfunc-selector.component';

describe('BuildinfuncSelectorComponent', () => {
  let component: BuildinfuncSelectorComponent;
  let fixture: ComponentFixture<BuildinfuncSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildinfuncSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildinfuncSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
