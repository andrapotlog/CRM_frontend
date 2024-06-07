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

@Component({
    selector: 'app-track-requests',
    templateUrl: './track-requests.component.html',
    styleUrls: ['./track-requests.component.css'],
})
export class TrackRequestsComponent implements OnInit {
    requests$: Observable<ServiceRequestModel[]> = this.store.select(
        fromReducer.selectServiceRequests,
    );

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
    ) {
        this.store.dispatch(fromActions.loadServiceRequests());

        this.trackingForm = this.fb.group({
            requestId: ['', Validators.required],
        });

        this.filterForm = this.fb.group({
            status: [''],
            priority: [''],
            city: [''],
        });

        this.requests$.subscribe((res) => console.log(res));
    }

    ngOnInit() {
        this.loadServiceRequests();
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
}
