import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsHelpModalComponent } from './claims-help-modal.component';

describe('ClaimsHelpModalComponent', () => {
  let component: ClaimsHelpModalComponent;
  let fixture: ComponentFixture<ClaimsHelpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsHelpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsHelpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
