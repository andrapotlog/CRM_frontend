import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Nullable } from '../../../../global.module';
import { CardInformation } from '../../../service/payments/payment.model';

@Component({
  selector: 'app-saved-cards-dialogue',
  templateUrl: './saved-cards-dialogue.component.html',
  styleUrls: ['./saved-cards-dialogue.component.css'],
})
export class SavedCardsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SavedCardsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { savedCards$: Observable<Nullable<CardInformation[]>> },
  ) {}

  selectCard(card: any) {
    this.dialogRef.close(card); // Return the selected card
  }
}
