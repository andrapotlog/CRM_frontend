import { Injectable } from '@angular/core';
import { Nullable } from '../../../global.module';
import { Store } from '@ngrx/store';
import * as fromActions from '../user-service/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
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
  ];

  areas = [
    { value: 0, label: 'General' },
    { value: 1, label: 'Bucuresti - Sector 1' },
    { value: 2, label: 'Bucuresti - Sector 2' },
    { value: 3, label: 'Bucuresti - Sector 3' },
    { value: 4, label: 'Bucuresti - Sector 4' },
    { value: 5, label: 'Bucuresti - Sector 5' },
    { value: 6, label: 'Bucuresti - Sector 6' },
  ];

  private role: Nullable<string> = null;

  get isUser(): boolean {
    return this.role ? this.role === 'ROLE_USER' : false;
  }

  get isEmployee(): boolean {
    return this.role ? this.role === 'ROLE_EMPLOYEE' : false;
  }

  get isSupport(): boolean {
    return this.role ? this.role === 'ROLE_SUPPORT' : false;
  }

  get isAdmin(): boolean {
    return true;
  }

  get getRequestTypes() {
    return this.requestTypes;
  }

  get getAreas() {
    return this.areas;
  }

  getUserLocations() {
    return this.areas.slice(1);
  }

  constructor(private store: Store) {
    store
      .select(fromActions.selectCurrentUserRole)
      .subscribe((role) => (this.role = role));
  }

  getTypeLabel(value: number): string {
    const type = this.requestTypes.find((type) => type.value === value);
    return type ? type.label : 'Unknown type';
  }

  getAreaLabel(value: number): string {
    const type = this.areas.find((type) => type.value === value);
    return type ? type.label : 'Unknown area';
  }
}
