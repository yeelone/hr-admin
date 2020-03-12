import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGroupSelectorComponent } from './profile-group-selector.component';

describe('ProfileGroupSelectorComponent', () => {
  let component: ProfileGroupSelectorComponent;
  let fixture: ComponentFixture<ProfileGroupSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileGroupSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
