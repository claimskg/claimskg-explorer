import { TestBed } from '@angular/core/testing';

import { ClaimsExportService } from './claims-export.service';

describe('ClaimsExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimsExportService = TestBed.get(ClaimsExportService);
    expect(service).toBeTruthy();
  });
});
