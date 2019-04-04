import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsAboutComponent } from './claims-about.component';

describe('ClaimsAboutComponent', () => {
  let component: ClaimsAboutComponent;
  let fixture: ComponentFixture<ClaimsAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
