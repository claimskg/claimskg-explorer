import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsResearchComponent } from './claims-research.component';

describe('ClaimsResearchComponent', () => {
  let component: ClaimsResearchComponent;
  let fixture: ComponentFixture<ClaimsResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
