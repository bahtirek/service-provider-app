import { TestBed } from '@angular/core/testing';

import { IntersectObserverService } from './intersect-observer.service';

describe('IntersectObserverService', () => {
  let service: IntersectObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntersectObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
