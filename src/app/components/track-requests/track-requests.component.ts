import { Component, OnInit } from '@angular/core';
import {
  PriorityEnum,
  RequestStatusEnum,
  ServiceRequestModel,
} from '../../service/request-service/request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromReducer from '../../service/request-service/request.reducer';
import * as fromActions from '../../service/request-service/request.actions';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';
import { SharedService } from '../../service/shared-service/shared.service';
import { Router } from '@angular/router';
import { Nullable } from '../../../global.module';
import { ErrorModel } from '../../service/error.interface';

@Component({
  selector: 'app-track-requests',
  templateUrl: './track-requests.component.html',
  styleUrls: ['./track-requests.component.css'],
})
export class TrackRequestsComponent implements OnInit {
  requests$: Observable<ServiceRequestModel[]> = this.store.select(
    fromReducer.selectServiceRequests,
  );
  loading$: Observable<boolean> = this.store.select(fromReducer.selectLoading);
  error$: Observable<Nullable<ErrorModel>> = this.store.select(
    fromReducer.selectError,
  );

  headers = ['id', 'type', 'priority', 'status', 'date', 'observations'];

  filterForm: FormGroup;
  trackingForm: FormGroup;

  priorities = Object.values(PriorityEnum);
  statuses = Object.values(RequestStatusEnum);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    public sharedService: SharedService,
  ) {
    this.store.dispatch(fromActions.loadServiceRequests());

    this.trackingForm = this.fb.group({
      requestId: ['', Validators.required],
    });

    this.filterForm = this.fb.group({
      status: [''],
      priority: [''],
      location: [''],
    });
  }

  ngOnInit() {
    this.loadServiceRequests();

    if (this.sharedService.isEmployee || this.sharedService.isAdmin)
      this.headers.push('actions');
  }

  createRequest() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/service-request']),
    );
    window.open(url, '_blank');
  }

  loadServiceRequests() {
    const filters = this.filterForm.value;
    this.store.dispatch(fromActions.filterServiceRequests({ filters }));
  }

  clearFilters() {
    this.filterForm.reset({
      status: '',
      priority: '',
      city: '',
      /*startDate: '',
      endDate: ''*/
    });
    this.loadServiceRequests();
  }

  openModal(request: ServiceRequestModel, edit: boolean) {
    const dialogRef = this.dialog.open(RequestDialogComponent, {
      width: '800px',
      data: { request, edit },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.action === 'save') {
        this.store.dispatch(
          fromActions.updateServiceRequest({
            payload: {
              ...request,
              type: result.request.type,
              priority: result.request.priority,
              status:
                result.request.status === 'IN PROGRESS'
                  ? 'INPROGRESS'
                  : result.request.status,
              location: result.request.location,
              address: result.request.address,
              observations: result.request.observations,
            },
          }),
        );

        this.store.dispatch(fromActions.loadServiceRequests());
      }
    });
  }
}
