import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { normalCatLoverGuard } from './normal-cat-lover.guard';

describe('normalCatLoverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => normalCatLoverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
