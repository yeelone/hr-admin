import { TestBed } from '@angular/core/testing';

import { CaptchaService } from './captcha.service';

describe('CaptchaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaptchaService = TestBed.get(CaptchaService);
    expect(service).toBeTruthy();
  });
});
