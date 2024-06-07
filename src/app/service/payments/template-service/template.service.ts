import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as fromModel from '../payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private apiUrl = 'http://localhost:6060/api/templates';

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<fromModel.Template[]> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return this.http.get<fromModel.Template[]>(this.apiUrl, config);
    //console.log(this.templates);
    //return of(this.templates);
    //return this.http.get<Payment[]>(this.apiUrl);
  }

  saveTemplate(template: fromModel.Template) {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const request = this.http.post(this.apiUrl, template, config);
    request.subscribe(
      (res) => {},
      (error) => {
        console.log(error);
      },
    );
    return request;
    //this.templates.push(template);
    //return of(this.payments);
    //return this.http.post<Payment>(this.apiUrl, payment);
  }

  deleteTemplate(id: number) {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    //this.templates = this.templates.filter((p) => p.id !== id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, config);
  }
}
