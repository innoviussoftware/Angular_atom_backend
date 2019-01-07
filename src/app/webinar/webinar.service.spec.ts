import { TestBed } from '@angular/core/testing';

import { WebinarService } from './webinar.service';

describe('WebinarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebinarService = TestBed.get(WebinarService);
    expect(service).toBeTruthy();
  });
});
