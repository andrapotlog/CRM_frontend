export interface UserModel {
  id_user?: number;
  firstName: string;
  lastName: string;
  email: string;
  clientCode: string;
  //birthDate: Date;
  cnp: string;
  phoneNumber: string;
  address: string;
  city: number;
  // country: string;
  postalCode: string;
  sendEmail: boolean;
  termsAndConditions: boolean;
  roles?: Role[];
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  userCredentials: UserCredentials;
  userData: UserModel;
}

export interface Role {
  roleId: number;
  roleName: string;
}
