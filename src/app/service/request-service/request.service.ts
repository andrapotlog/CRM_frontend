import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRequestModel } from './request.model';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  // private apiUrl = 'http://localhost/api/requests';

  private apiUrl = environment.apiEndpoints.requestsService;

  // private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) {}

  getServiceRequests(
    status?: string,
    priority?: string,
    location?: number,
  ): Observable<ServiceRequestModel[]> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams();

    if (status) params = params.append('status', status);
    if (priority) params = params.append('priority', priority);
    if (location) params = params.append('location', location);
    /*if (startDate) params = params.append('startDate', startDate);
    if (endDate) params = params.append('endDate', endDate);*/

    return this.http.get<ServiceRequestModel[]>(this.apiUrl, {
      headers,
      params,
    });
  }

  getServiceRequestById(id: number): Observable<ServiceRequestModel> {
    return this.http.get<ServiceRequestModel>(`${this.apiUrl}/${id}`);
  }

  createServiceRequest(request: ServiceRequestModel) {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return this.http.post(this.apiUrl, request, config);
  }

  updateServiceRequest(request: ServiceRequestModel) {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return this.http.put(this.apiUrl, request, config);
  }

  deleteServiceRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
