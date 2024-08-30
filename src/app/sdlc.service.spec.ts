import { TestBed } from '@angular/core/testing';

import { SDLCService } from './sdlc.service';

describe('SDLCService', () => {
  let service: SDLCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SDLCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
