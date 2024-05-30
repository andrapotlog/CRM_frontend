import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PriorityEnum, ServiceRequestModel} from "../../service/request-service/request.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

import * as fromActions from "../../service/request-service/request.actions";
import {selectCurrentUser} from "../../service/user-service/user.reducer";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-request-service',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit{
  //currentUser$ = this.store.pipe(select(selectCurrentUser));
  takeUntil$: Subject<void> = new Subject<void>();

  userId: number | undefined = 0;

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

  constructor(private fb: FormBuilder, private router: Router, private store: Store) {
    this.serviceRequestForm = this.fb.group({
      type: new FormControl('', [ Validators.required]) ,
      description: new FormControl('',[Validators.required, Validators.minLength(10)]),
      location: ['', Validators.required],
      priority: ['', Validators.required],
      documents: ['']
    });
  }

  ngOnInit() {
    this.store
      .select(selectCurrentUser)
      .pipe(takeUntil(this.takeUntil$))
      .subscribe(user => this.userId = user?.id_user)

    //this.currentUser$.subscribe(user => /*this.userId = user?.id_user || 0*/console.log(user))
    console.log(this.userId)
  }

  onSubmit() {
    if (this.serviceRequestForm.valid) {
      console.log('Service Request Submitted', this.serviceRequestForm.getRawValue());
      /*const payload: ServiceRequestModel = {
        type: this.serviceRequestForm.controls['type'].value,
        description: this.serviceRequestForm.controls['description'].value,
        location: this.serviceRequestForm.controls['location'].value,
        priority: this.serviceRequestForm.controls['priority'].value,
        created_by_user: 1
      }*/
      this.store.dispatch(fromActions.createServiceRequest({
        payload: {
          ...this.serviceRequestForm.getRawValue(),
          created_by_user: this.userId
        }
      }));
    }

  }

  goToTrackRequests() {
    this.router.navigateByUrl('/track-request');
  }
}
