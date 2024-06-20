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
  templateName: string = '';

  constructor(
    public dialogRef: MatDialogRef<SavePaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Template,
    private templateService: TemplateService,
  ) {}

  saveTemplate() {
    this.templateService.saveTemplate({
      ...this.data,
      templateName: this.templateName,
    });

    console.log({
      ...this.data,
      templateName: this.templateName,
    });
    this.dialogRef.close(true);
  }
}
