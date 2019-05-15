import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagProfileListComponent } from './tag-profile-list.component';

describe('TagProfileListComponent', () => {
  let component: TagProfileListComponent;
  let fixture: ComponentFixture<TagProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagProfileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
