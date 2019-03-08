import { TestBed } from '@angular/core/testing';

import { NonDataStateService } from './non-data-state.service';

describe('NonDataStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NonDataStateService = TestBed.get(NonDataStateService);
    expect(service).toBeTruthy();
  });
});
