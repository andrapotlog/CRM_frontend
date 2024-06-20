import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user-service/user.service';
import { Store } from '@ngrx/store';
import { loadUser } from '../../service/user-service/user.actions';
import { selectCurrentUser } from '../../service/user-service/user.reducer';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.css'],
})
export class PersonalProfileComponent implements OnInit {
  currentUser$ = this.store.select(selectCurrentUser);

  userDataForm: FormGroup;

  constructor(
    private userService: UserService,
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

      email: new FormControl('', [Validators.required, Validators.email]),

      clientCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{8}$/),
      ]),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.currentUser$.subscribe((res) => {
      localStorage.setItem('userId', JSON.stringify(res?.id_user));
    });
  }
}
