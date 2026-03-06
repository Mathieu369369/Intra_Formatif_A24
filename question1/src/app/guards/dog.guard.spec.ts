import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dogGuard } from './dog.guard';

describe('dogGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
