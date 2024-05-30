import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private nominatimUrl = 'https://nominatim.openstreetmap.org/reverse';

  constructor(private http: HttpClient) { }

  reverseGeocode(lat: number, lon: number): Observable<any> {
    const url = `${this.nominatimUrl}?format=json&lat=${lat}&lon=${lon}`;
    return this.http.get(url);
  }
}
