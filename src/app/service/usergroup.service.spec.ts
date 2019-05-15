import { TestBed, inject } from '@angular/core/testing';

import { UserGroupService } from './usergroup.service';

describe('UsergroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGroupService]
    });
  });

  it('should be created', inject([UserGroupService], (service: UserGroupService) => {
    expect(service).toBeTruthy();
  }));
});
