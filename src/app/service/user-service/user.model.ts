export interface UserModel {
  id_user?: number;
  firstName: string;
  lastName: string;
  email: string;
  clientCode: string;
  birthdate: string;
  cnp: string;
  phoneNumber: string;
  address: string;
  city: number;
  postalCode: string;
  sendEmail: boolean;
  termsAndConditions: boolean;
  roles?: Role[];
  creationDate?: string;
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
