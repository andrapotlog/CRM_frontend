import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Template } from '../../../service/payments/payment.model';
import { TemplateService } from '../../../service/payments/template-service/template.service';

@Component({
  selector: 'app-save-template-dialogue',
  templateUrl: './save-payment-dialog.component.html',
  styleUrls: ['./save-payment-dialog.component.css'],
})
export class SavePaymentDialogComponent {
  templateName: string = ''; // Add this line
  constructor(
    public dialogRef: MatDialogRef<SavePaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Template, // Pass payment data here
    private templateService: TemplateService,
  ) {}

  saveTemplate() {
    // Implement logic to save payment details as a template
    // You'll likely need to access a service or store to handle saving
    this.templateService.saveTemplate({
      ...this.data,
      templateName: this.templateName,
    });

    console.log({
      ...this.data,
      templateName: this.templateName,
    });
    this.dialogRef.close(true); // Close the dialog with 'true' to indicate saving
  }
}
