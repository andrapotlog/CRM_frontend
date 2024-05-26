import {Component} from '@angular/core';
import {RequestStatusEnum, ServiceRequestModel} from "../../service/request-service/request.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-track-requests',
  templateUrl: './track-requests.component.html',
  styleUrls: ['./track-requests.component.css']
})
export class TrackRequestsComponent {
  trackingForm: FormGroup;
  selectedRequest: ServiceRequestModel | null = null;
  requestNotFound = false;

  requests: ServiceRequestModel[] = [
    {
      id: '1',
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
  ];

  constructor(private fb: FormBuilder) {
    this.trackingForm = this.fb.group({
      requestId: ['', Validators.required]
    });
  }

  selectRequest(request: ServiceRequestModel) {
    this.selectedRequest = request;
    this.requestNotFound = false;

    //window.open(this.router.serializeUrl(urlTree), '_blank');
  }
}
