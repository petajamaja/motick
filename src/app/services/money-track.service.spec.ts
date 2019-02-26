import { TestBed } from '@angular/core/testing';

import { MoneyTrackService } from './money-track.service';

describe('MoneyTrackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoneyTrackService = TestBed.get(MoneyTrackService);
    expect(service).toBeTruthy();
  });
});
