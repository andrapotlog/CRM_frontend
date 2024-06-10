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

@Component({
  selector: 'app-track-requests',
  templateUrl: './track-requests.component.html',
  styleUrls: ['./track-requests.component.css'],
})
export class TrackRequestsComponent implements OnInit {
  requests$: Observable<ServiceRequestModel[]> = this.store.select(
    fromReducer.selectServiceRequests,
  );

  headers = ['id', 'type', 'priority', 'status', 'date', 'observations'];

  areas = [
    { value: 0, label: 'General' },
    { value: 1, label: 'Bucuresti - Sector 1' },
    { value: 2, label: 'Bucuresti - Sector 2' },
    { value: 3, label: 'Bucuresti - Sector 3' },
    { value: 4, label: 'Bucuresti - Sector 4' },
    { value: 5, label: 'Bucuresti - Sector 5' },
    { value: 6, label: 'Bucuresti - Sector 6' },
  ];

  filterForm: FormGroup;
  trackingForm: FormGroup;
  selectedRequest: ServiceRequestModel | null = null;
  requestNotFound = false;

  priorities = Object.values(PriorityEnum);
  statuses = Object.values(RequestStatusEnum);

  /*requests: ServiceRequestModel[] = [
  {
    id: 1,
    type: 'Street Repair',
    description: 'Pothole on Main Street',
    location: 'Main Street, City Center',
    urgency: 'High',
    status: RequestStatusEnum.inProgress,
    date: '15/05/2024'
  },
  {
    id: '2',
    type: 'Waste Collection',
    description: 'Missed waste collection',
    location: 'Elm Street, Suburb',
    urgency: 'Medium',
    status: RequestStatusEnum.pending,
    date: '10/04/2024'
  },
  {
    id: '3',
    type: 'Noise Complaint',
    description: 'Noisy neighbours',
    location: 'address',
    urgency: 'Medium',
    status: RequestStatusEnum.completed,
    date: '21/02/2024'
  }
];*/

  constructor(
    private fb: FormBuilder,
    private store: Store,
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

    this.requests$.subscribe((res) => console.log(res));
  }

  ngOnInit() {
    this.loadServiceRequests();

    console.log(this.sharedService.isEmployee || this.sharedService.isAdmin);
    if (this.sharedService.isEmployee || this.sharedService.isAdmin)
      this.headers.push('actions');
  }

  loadServiceRequests() {
    const filters = this.filterForm.value;
    console.log(filters);
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

  selectRequest(request: ServiceRequestModel) {
    this.selectedRequest = request;
    this.requestNotFound = false;

    //window.open(this.router.serializeUrl(urlTree), '_blank');
  }

  openModal(request: ServiceRequestModel, edit: boolean) {
    const dialogRef = this.dialog.open(RequestDialogComponent, {
      width: '800px',
      //height: edit ? '650px' : '500px',
      data: { request, edit },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.action === 'save') {
        console.log(result.request);

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
