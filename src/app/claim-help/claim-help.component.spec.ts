import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimHelpComponent } from './claim-help.component';

describe('ClaimHelpComponent', () => {
  let component: ClaimHelpComponent;
  let fixture: ComponentFixture<ClaimHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
