import { TestBed, inject } from '@angular/core/testing';

import { TemplateaccountService } from './templateaccount.service';

describe('TemplateaccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateaccountService]
    });
  });

  it('should be created', inject([TemplateaccountService], (service: TemplateaccountService) => {
    expect(service).toBeTruthy();
  }));
});
