import { TestBed, inject } from '@angular/core/testing';

import { SalaryService } from './salary.service';

describe('SalaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryService]
    });
  });

  it('should be created', inject([SalaryService], (service: SalaryService) => {
    expect(service).toBeTruthy();
  }));
});
