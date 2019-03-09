import { TestBed } from '@angular/core/testing';

import { ClaimsSparqlService } from './claims-sparql.service';

describe('ClaimsSparqlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimsSparqlService = TestBed.get(ClaimsSparqlService);
    expect(service).toBeTruthy();
  });
});
