import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PriorityEnum } from '../../service/request-service/request.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../service/user-service/user.reducer';
import { Subject, takeUntil } from 'rxjs';
import * as fromActions from '../../service/request-service/request.actions';

@Component({
  selector: 'app-request-service',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css'],
})
export class ServiceRequestComponent implements OnInit {
  //currentUser$ = this.store.pipe(select(selectCurrentUser));
  takeUntil$: Subject<void> = new Subject<void>();

  userId: number | undefined = 0;

  priorities = Object.values(PriorityEnum);
  serviceRequestForm: FormGroup;

  areas = [
    { value: 0, label: 'General' },
    { value: 1, label: 'Bucuresti - Sector 1' },
    { value: 2, label: 'Bucuresti - Sector 2' },
    { value: 3, label: 'Bucuresti - Sector 3' },
    { value: 4, label: 'Bucuresti - Sector 4' },
    { value: 5, label: 'Bucuresti - Sector 5' },
    { value: 6, label: 'Bucuresti - Sector 6' },
  ];

  requestTypes = [
    { value: 1, label: 'Street Repair' },
    { value: 2, label: 'Amenajare spatiu verde' },
    { value: 3, label: 'Cerere aviz taiere/toaletare arbori PF/PJ/AP' },
    { value: 4, label: 'Solicitare amplasare banci' },
    { value: 5, label: 'Solicitare amplasare cosuri de gunoi' },
    { value: 6, label: 'Solicitare amplasare garduri metalice' },
    {
      value: 7,
      label: 'Adeverinta bunuri desfiintate sau ridicate de pe domeniul public',
    },
    { value: 8, label: 'Cerere stalpisori delimitare acces pietonal' },
    { value: 9, label: 'Cerere limitatoare de viteza' },
    { value: 10, label: 'Marcaje rutiere orizontale' },
    { value: 11, label: 'Solicitare intretinere parcaj' },
    { value: 12, label: 'Cerere actualizare date de contract' },
    { value: 13, label: 'Solicitare schimbare act de identitate' },
    //directia nationala de pasapoarte
    { value: 14, label: 'Solicitare pasaport simplu electronic' },
    { value: 15, label: 'Solicitare pasaport simplu temporar' },

    //politie
    { value: 16, label: 'Eliberare cazier' },

    /*{ value: 'noise-complaint', label: 'Noise Complaint' },
    { value: 'illegal-dumping', label: 'Illegal Dumping' },
    { value: 'pothole-repair', label: 'Pothole Repair' },
    { value: 'tree-trimming', label: 'Tree Trimming' },
    { value: 'graffiti-removal', label: 'Graffiti Removal' },
    { value: 'street-light-outage', label: 'Street Light Outage' },
    { value: 'animal-control', label: 'Animal Control' },
    { value: 'parking-violation', label: 'Parking Violation' },
    { value: 'public-health', label: 'Public Health' },*/
    { value: 0, label: 'Other' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {
    this.serviceRequestForm = this.fb.group({
      type: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      location: ['', Validators.required],
      address: ['', Validators.required],
      priority: ['', Validators.required],
      //documents: [''],
    });
  }

  ngOnInit() {
    this.store
      .select(selectCurrentUser)
      .pipe(takeUntil(this.takeUntil$))
      .subscribe((user) => (this.userId = user?.id_user));

    //this.currentUser$.subscribe(user => /*this.userId = user?.id_user || 0*/console.log(user))
    console.log(this.userId);
  }

  onSubmit() {
    if (this.serviceRequestForm.valid) {
      console.log(
        'Service Request Submitted',
        this.serviceRequestForm.getRawValue(),
      );
      /*const payload: ServiceRequestModel = {
        type: this.serviceRequestForm.controls['type'].value,
        description: this.serviceRequestForm.controls['description'].value,
        location: this.serviceRequestForm.controls['location'].value,
        priority: this.serviceRequestForm.controls['priority'].value,
        created_by_user: 1
      }*/
      this.store.dispatch(
        fromActions.createServiceRequest({
          payload: {
            ...this.serviceRequestForm.getRawValue(),
          },
        }),
      );
    }
  }

  goToTrackRequests() {
    this.router.navigateByUrl('/track-request');
  }
}
