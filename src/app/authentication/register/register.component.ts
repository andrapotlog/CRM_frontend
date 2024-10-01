import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { UserService } from '../../service/user-service/user.service';
import { AuthService } from '../../service/auth/auth.service';
import { Store } from '@ngrx/store';

import * as UserModel from '../../service/./user-service/user.model';

import { createUser, loadUsers } from '../../service/user-service/user.actions';
import {
  selectError,
  selectUsers,
} from '../../service/user-service/user.reducer';
import { SharedService } from '../../service/shared-service/shared.service';

interface CountryCode {
  code: number;
  region: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  minPassword = 8;

  minDate: Date;
  maxDate: Date;

  credentialsPage = true;
  personalDataPage = false;

  userCredentialsError = false;
  cnpAlreadyExistsError = false;

  countryCodes: CountryCode[] = [];

  credentialsForm: FormGroup;
  personalDataForm: FormGroup;

  users$ = this.store.select(selectUsers);
  error$ = this.store.select(selectError);

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private store: Store,
    public sharedService: SharedService,
  ) {
    const currentDate = new Date();
    this.maxDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate(),
    );

    this.minDate = new Date(1900, 0, 1);

    this.credentialsForm = this.formBuilder.group({
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
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minPassword),
      ]),

      repeatPassword: new FormControl('', [
        Validators.required,
        this.passwordsMatch,
      ]),
    });

    this.personalDataForm = this.formBuilder.group({
      birthDate: new FormControl('', [
        Validators.required,
        this.minDateValidator(),
        this.maxDateValidator(),
      ]),

      cnp: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{13}$/),
        this.cnpValidator,
      ]),

      countryCode: new FormControl(null, [Validators.required]),

      phoneNumber: new FormControl(null, [
        Validators.required,
        this.phoneNumberValidator,
      ]),

      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{6}$/),
      ]),
      termsAndConditions: [false, Validators.requiredTrue],
      sendEmail: [false],
    });
  }

  ngOnInit(): void {
    this.countryCodes = this.getCountryCodes();
    this.store.dispatch(loadUsers());

    this.error$.subscribe((error) => {
      this.cnpAlreadyExistsError = !!(error && error.statusCode === 400);
    });
  }

  firstSubmit() {
    this.authService
      .registerUserCredentials(this.credentialsForm.controls['email'].value)
      .subscribe(
        (res) => {
          this.credentialsPage = false;
          this.personalDataPage = true;
        },
        (error) => {
          console.log(error);
          this.userCredentialsError = true;
        },
      );
  }

  finalSubmit() {
    const payload: UserModel.RegistrationData = {
      userCredentials: {
        email: this.credentialsForm.controls['email'].value,
        password: this.credentialsForm.controls['password'].value,
      },
      userData: {
        firstName: this.credentialsForm.controls['firstName'].value,
        lastName: this.credentialsForm.controls['lastName'].value,
        email: this.credentialsForm.controls['email'].value,
        clientCode: this.credentialsForm.controls['clientCode'].value,
        cnp: this.personalDataForm.controls['cnp'].value,
        birthdate: this.personalDataForm.controls['birthDate'].value,
        phoneNumber:
          this.personalDataForm.controls['countryCode'].value +
          this.personalDataForm.controls['phoneNumber'].value,
        address: this.personalDataForm.controls['address'].value,
        city: this.personalDataForm.controls['city'].value,
        sendEmail: this.personalDataForm.controls['agreeToReceiveUpdates']
          ? this.personalDataForm.controls['agreeToReceiveUpdates'].value
          : false,
        termsAndConditions: this.personalDataForm.controls['agreeToProcessData']
          ? this.personalDataForm.controls['agreeToProcessData'].value
          : false,
        postalCode: this.personalDataForm.controls['postalCode'].value,
      },
    };

    console.log(payload);
    this.store.dispatch(createUser({ payload }));
  }

  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password')?.value;
    const repeatPassword = control.value;

    return password === repeatPassword ? null : { passwordMismatch: true };
  }

  minDateValidator() {
    return (control: { value: string | number | Date }) => {
      const selectedDate = new Date(control.value);
      const minDate = this.minDate;

      if (selectedDate < minDate) return { minDate: true };

      return null;
    };
  }

  maxDateValidator() {
    return (control: { value: string | number | Date }) => {
      const selectedDate = new Date(control.value);
      const maxDate = this.maxDate;

      if (selectedDate > maxDate) return { maxDate: true };

      return null;
    };
  }

  cnpValidator(control: AbstractControl) {
    const cnpControlNumber: string = '279146358279';
    const cnp = control?.value;
    const birthdate = control.parent?.get('birthDate')?.value;

    if (birthdate && cnp && cnp.length === 13) {
      const cnpControlDigit = parseInt(cnp.substring(12, 13));
      const cnpGenderDigit = parseInt(cnp.substring(0, 1));
      const cnpYearDigits = parseInt(cnp.substring(1, 3));
      const cnpMonthDigits = parseInt(cnp.substring(3, 5));
      const cnpDayDigits = parseInt(cnp.substring(5, 7));

      const birthdateYear = birthdate.getFullYear();
      const birthdateMonth = birthdate.getMonth();
      const birthdateDay = birthdate.getDate();

      //checksum
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum +=
          parseInt(cnp.substring(i, i + 1)) *
          parseInt(cnpControlNumber.substring(i, i + 1));
      }

      const checksum = sum % 11 === 10 ? 1 : sum % 11;

      if (cnpControlDigit !== checksum) return { cnpInvalid: true };

      // first digit (gender)
      if (birthdateYear < 2000) {
        if (!(cnpGenderDigit === 1 || cnpGenderDigit === 2))
          return { cnpInvalid: true };
      } else {
        if (!(cnpGenderDigit === 5 || cnpGenderDigit === 6))
          return { cnpInvalid: true };
      }

      if (
        parseInt(birthdateYear.toString().substring(2)) !== cnpYearDigits ||
        birthdateMonth !== cnpMonthDigits - 1 ||
        birthdateDay !== cnpDayDigits
      )
        return { cnpInvalid: true };
    }

    return null;
  }

  getCountryCodes(): CountryCode[] {
    let countryCodes: CountryCode[] = [];
    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    const countries: string[] = phoneNumberUtil.getSupportedRegions();

    countries.forEach((country) => {
      const countryCode = phoneNumberUtil.getCountryCodeForRegion(country);
      if (country === 'RO') {
        countryCodes.unshift({ code: countryCode, region: country });
      } else countryCodes.push({ code: countryCode, region: country });
    });

    return countryCodes;
  }

  phoneNumberValidator(control: AbstractControl) {
    const phoneNumberInput = control?.value;
    const countryCode = control.parent?.get('countryCode')?.value;

    const phoneNumberUtil = PhoneNumberUtil.getInstance();

    try {
      const phoneNumber = phoneNumberUtil.parse(
        '+' + countryCode + phoneNumberInput,
      );
      return !phoneNumberUtil.isValidNumber(phoneNumber)
        ? { phoneNumberInvalid: true }
        : null;
    } catch (error) {
      return { phoneNumberInvalid: true };
    }
  }
}
