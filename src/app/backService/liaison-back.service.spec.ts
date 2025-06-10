import { TestBed } from '@angular/core/testing';

import { LiaisonBackService } from './liaison-back.service';

describe('LiaisonBackService', () => {
  let service: LiaisonBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiaisonBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
