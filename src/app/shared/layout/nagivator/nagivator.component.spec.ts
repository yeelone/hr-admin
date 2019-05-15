import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NagivatorComponent } from './nagivator.component';

describe('NagivatorComponent', () => {
  let component: NagivatorComponent;
  let fixture: ComponentFixture<NagivatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NagivatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NagivatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
