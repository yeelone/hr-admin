import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFieldsSelectorComponent } from './profile-fields-selector.component';

describe('ProfileFieldsSelectorComponent', () => {
  let component: ProfileFieldsSelectorComponent;
  let fixture: ComponentFixture<ProfileFieldsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFieldsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFieldsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
