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

  clientCodePage = false;
  passwordPage = false;
  personalDataPage = true;

  countryCodes: CountryCode[] = [];

  clientForm: FormGroup;
  passwordForm: FormGroup;
  personalDataForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    const currentDate = new Date();
    this.maxDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate(),
    );

    this.minDate = new Date(1900, 0, 1);

    this.clientForm = this.formBuilder.group({
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

    this.passwordForm = this.formBuilder.group({
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
      country: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{6}$/),
      ]),
    });

    //console.log(currentDate.toLocaleDateString('en-GB'));
  }

  ngOnInit(): void {
    this.countryCodes = this.getCountryCodes();

    //console.log(this.countryCodes);
  }

  firstSubmit() {
    console.log(this.clientForm.controls);
    this.clientCodePage = false;
    this.passwordPage = true;
  }

  secondSubmit() {
    console.log(this.passwordForm.controls);
    this.clientCodePage = false;
    this.passwordPage = false;
    this.personalDataPage = true;
  }

  finalSubmit() {
    /*console.log(
      this.personalDataForm.controls['birthDate'].value.toLocaleDateString(
        'en-GB',
      ),
    );*/
    console.log(this.personalDataForm.controls);
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
    const cnpControlNumber = '279146358279';
    const cnp = control?.value;
    const birthdate = control.parent?.get('birthDate')?.value;

    if (birthdate && cnp && cnp.toString().length === 13) {
      const cnpString = cnp.toString();

      const cnpControlDigit = parseInt(cnpString.substring(12, 13));
      const cnpGenderDigit = parseInt(cnpString.substring(0, 1));
      const cnpYearDigits = parseInt(cnpString.substring(1, 3));
      const cnpMonthDigits = parseInt(cnpString.substring(3, 5));
      const cnpDayDigits = parseInt(cnpString.substring(5, 7));

      const birthdateYear = birthdate.getFullYear();
      const birthdateMonth = birthdate.getMonth();
      const birthdateDay = birthdate.getDate();

      //checksum
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum +=
          parseInt(cnpString.substring(i, i + 1)) *
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

    //if (phoneNumberInput) {
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
    // }

    // return null;
  }
}
