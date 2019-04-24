import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsStatisticsComponent } from './claims-statistics.component';

describe('ClaimsStatisticsComponent', () => {
  let component: ClaimsStatisticsComponent;
  let fixture: ComponentFixture<ClaimsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
