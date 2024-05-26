import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRequestsComponent } from './track-requests.component';

describe('TrackRequestsComponent', () => {
  let component: TrackRequestsComponent;
  let fixture: ComponentFixture<TrackRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackRequestsComponent]
    });
    fixture = TestBed.createComponent(TrackRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
