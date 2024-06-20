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
import { SharedService } from '../../service/shared-service/shared.service';

@Component({
  selector: 'app-request-service',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css'],
})
export class ServiceRequestComponent implements OnInit {
  takeUntil$: Subject<void> = new Subject<void>();

  userId: number | undefined = 0;

  priorities = Object.values(PriorityEnum);
  serviceRequestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    public sharedService: SharedService,
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
  }

  onSubmit() {
    if (this.serviceRequestForm.valid) {
      console.log(
        'Service Request Submitted',
        this.serviceRequestForm.getRawValue(),
      );
      this.store.dispatch(
        fromActions.createServiceRequest({
          payload: {
            ...this.serviceRequestForm.getRawValue(),
          },
        }),
      );
    }
  }
}
