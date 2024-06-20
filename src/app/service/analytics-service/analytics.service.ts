import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsData } from './analytics.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  // private apiUrl = 'http://localhost:1010/api/analytics';
  private apiUrl = environment.apiEndpoints.analyticsService;

  // private apiUrl = 'http://localhost/api/analytics';

  constructor(
    private http: HttpClient,
    /*private gtag: Gtag, private router: Router*/
  ) {}

  getAnalytics(): Observable<AnalyticsData> {
    return this.http.get<AnalyticsData>(this.apiUrl);
  }

  /* trackEvent(action: string, category: string, label: string, value?: number): void {
     this.gtag.event(action, {
       event_category: category,
       event_label: label,
       value: value
     });
   }*/
}
