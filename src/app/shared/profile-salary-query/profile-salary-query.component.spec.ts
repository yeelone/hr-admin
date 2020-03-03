import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSalaryQueryComponent } from './profile-salary-query.component';

describe('ProfileSalaryQueryComponent', () => {
  let component: ProfileSalaryQueryComponent;
  let fixture: ComponentFixture<ProfileSalaryQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSalaryQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSalaryQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
