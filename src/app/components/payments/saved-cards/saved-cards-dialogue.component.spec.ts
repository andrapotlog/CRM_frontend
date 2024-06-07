import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCardsDialogComponent } from './saved-cards-dialogue.component';

describe('SavedCardsDialogComponent', () => {
  let component: SavedCardsDialogComponent;
  let fixture: ComponentFixture<SavedCardsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedCardsDialogComponent],
    });
    fixture = TestBed.createComponent(SavedCardsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
