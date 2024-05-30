import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable,} from "rxjs";
import {ServiceRequestModel} from "./request.model";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) { }

  getServiceRequests(
    status?: string,
    priority?: string,
    city?: string,
    createdBy?: number
  ): Observable<ServiceRequestModel[]> {
    let params = new HttpParams();

    if (status) params = params.append('status', status);
    if (priority) params = params.append('priority', priority);
    if (city) params = params.append('city', city);
    /*if (startDate) params = params.append('startDate', startDate);
    if (endDate) params = params.append('endDate', endDate);*/
    if (createdBy) params = params.append('createdBy', createdBy.toString());

    return this.http.get<ServiceRequestModel[]>(this.apiUrl, { params });
  }

  getServiceRequestById(id: number): Observable<ServiceRequestModel> {
    return this.http.get<ServiceRequestModel>(`${this.apiUrl}/${id}`);
  }

  createServiceRequest(request: ServiceRequestModel) {
    return this.http.post<ServiceRequestModel>(this.apiUrl, request);
  }

  updateServiceRequest(id: number, serviceRequest: ServiceRequestModel): Observable<ServiceRequestModel> {
    return this.http.put<ServiceRequestModel>(`${this.apiUrl}/${id}`, serviceRequest);
  }

  deleteServiceRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
