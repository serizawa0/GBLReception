import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { forceHomeRedirectGuard } from './force-home-redirect.guard';

describe('forceHomeRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => forceHomeRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
