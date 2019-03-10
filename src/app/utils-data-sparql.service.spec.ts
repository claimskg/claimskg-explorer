import { TestBed } from '@angular/core/testing';

import { UtilsDataSparqlService } from './utils-data-sparql.service';

describe('UtilsDataSparqlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilsDataSparqlService = TestBed.get(UtilsDataSparqlService);
    expect(service).toBeTruthy();
  });
});
