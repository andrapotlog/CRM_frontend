import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePaymentDialogComponent } from './save-payment-dialog.component';

describe('SavePaymentDialogueComponent', () => {
  let component: SavePaymentDialogComponent;
  let fixture: ComponentFixture<SavePaymentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavePaymentDialogComponent],
    });
    fixture = TestBed.createComponent(SavePaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
