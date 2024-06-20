import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as fromModel from '../payment.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  // private apiUrl = 'http://localhost/api/templates';

  private apiUrl = environment.apiEndpoints.templatesService;

  // private apiUrl = 'http://localhost:6060/api/templates';

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<fromModel.Template[]> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return this.http.get<fromModel.Template[]>(this.apiUrl, config);
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
  }

  deleteTemplate(id: number) {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return this.http.delete<void>(`${this.apiUrl}/${id}`, config);
  }
}
