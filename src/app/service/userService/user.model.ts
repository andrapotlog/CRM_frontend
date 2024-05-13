export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  clientCode: string;
  //birthDate: Date;
  cnp: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}
