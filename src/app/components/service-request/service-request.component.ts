import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PriorityEnum} from "../../service/request-service/request.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-service',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent {
  priorities = Object.values(PriorityEnum);
  serviceRequestForm: FormGroup;

  requestTypes = [
    { value: 'street-repair', label: 'Street Repair' },
    { value: 'waste-collection', label: 'Waste Collection' },
    { value: 'public-safety', label: 'Public Safety' },
    { value: 'water-supply', label: 'Water Supply' },
    { value: 'electricity-outage', label: 'Electricity Outage' },
    { value: 'noise-complaint', label: 'Noise Complaint' },
    { value: 'illegal-dumping', label: 'Illegal Dumping' },
    { value: 'pothole-repair', label: 'Pothole Repair' },
    { value: 'tree-trimming', label: 'Tree Trimming' },
    { value: 'graffiti-removal', label: 'Graffiti Removal' },
    { value: 'street-light-outage', label: 'Street Light Outage' },
    { value: 'animal-control', label: 'Animal Control' },
    { value: 'parking-violation', label: 'Parking Violation' },
    { value: 'public-health', label: 'Public Health' },
    { value: 'other', label: 'Other' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.serviceRequestForm = this.fb.group({
      type: new FormControl('', [ Validators.required]) ,
      description: new FormControl('',[Validators.required, Validators.minLength(10)]),
      location: ['', Validators.required],
      urgency: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.serviceRequestForm.valid) {
      console.log('Service Request Submitted', this.serviceRequestForm.value);
    }
  }

  goToTrackRequests() {
    this.router.navigateByUrl('/track-request');
  }
}
