import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleProfileListComponent } from './simple-profile-list.component';

describe('SimpleProfileListComponent', () => {
  let component: SimpleProfileListComponent;
  let fixture: ComponentFixture<SimpleProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleProfileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
