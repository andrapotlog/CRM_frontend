import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  PriorityEnum,
  RequestStatusEnum,
  ServiceRequestModel,
} from '../../../service/request-service/request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../service/shared-service/shared.service';
import { share } from 'rxjs';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css'],
})
export class RequestDialogComponent {
  requestForm: FormGroup;

  priorities = Object.values(PriorityEnum);
  statuses = Object.values(RequestStatusEnum);

  viewModeTitle = 'Request Details';
  editModeTitle = 'Update Request';

  constructor(
    public dialogRef: MatDialogRef<RequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { request: ServiceRequestModel; edit: boolean },
    private fb: FormBuilder,
    public sharedService: SharedService,
  ) {
    this.requestForm = this.fb.group({
      type: [data.request.type, Validators.required],
      priority: [data.request.priority, Validators.required],
      status: [data.request.status, Validators.required],
      location: [data.request.location, Validators.required],
      address: [data.request.address, Validators.required],
      observations: [data.request.observations],
    });
  }

  save() {
    if (this.requestForm.valid) {
      this.dialogRef.close({ action: 'save', request: this.requestForm.value });
    }
  }

  cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }

  protected readonly share = share;
}
