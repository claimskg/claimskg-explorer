import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsExportModalComponent } from './claims-export-modal.component';

describe('ClaimsExportModalComponent', () => {
  let component: ClaimsExportModalComponent;
  let fixture: ComponentFixture<ClaimsExportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsExportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsExportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
