import { TestBed, inject } from '@angular/core/testing';

import { AuditService } from './audit.service';

describe('AuditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditService]
    });
  });

  it('should be created', inject([AuditService], (service: AuditService) => {
    expect(service).toBeTruthy();
  }));
});
