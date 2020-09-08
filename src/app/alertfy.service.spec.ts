import { TestBed } from '@angular/core/testing';

import { AlertfyService } from './alertfy.service';

describe('AlertfyService', () => {
  let service: AlertfyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertfyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
