import { Component, OnInit } from '@angular/core';
import {
  selectCurrentUser,
  selectError,
  selectLoading,
} from '../../service/user-service/user.reducer';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../service/user-service/user.service';
import { Store } from '@ngrx/store';
import { loadUser, updateUser } from '../../service/user-service/user.actions';
import { Observable } from 'rxjs';
import { UserModel } from '../../service/user-service/user.model';
import { Nullable } from '../../../global.module';
import { ErrorModel } from '../../service/error.interface';
import { SharedService } from '../../service/shared-service/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<Nullable<UserModel>> =
    this.store.select(selectCurrentUser);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<Nullable<ErrorModel>> = this.store.select(selectError);

  userDataForm: FormGroup;

  viewOnly: boolean = true;

  constructor(
    private userService: UserService,
    public sharedService: SharedService,
    private store: Store,
    private formBuilder: FormBuilder,
  ) {
    this.userDataForm = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z- ]+$'),
      ]),

      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z- ]+$'),
      ]),

      phoneNumber: new FormControl(null, [Validators.required]),

      address: new FormControl('', [Validators.required]),
      city: new FormControl(0, [Validators.required]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{6}$/),
      ]),
      sendEmail: [false],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.currentUser$.subscribe((user) => {
      console.log(user);
      localStorage.setItem('userId', JSON.stringify(user?.id_user));
      if (user) this.userDataForm.patchValue(user);
    });
  }

  updatePersonalData(user: UserModel) {
    if (this.userDataForm.valid) {
      const updatedUser: UserModel = {
        ...this.userDataForm.value,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      console.log(this.userDataForm.value);
      this.store.dispatch(updateUser({ payload: updatedUser }));
    }
    this.viewOnly = true;
  }

  editData() {
    this.viewOnly = false;
  }
}
