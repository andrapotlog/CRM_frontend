import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {AnalyticsData} from "./analytics.model";
/*import {Gtag} from "angular-gtag";
import {NavigationEnd, Router} from "@angular/router";*/

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:8080/api/analytics';

  analytics: AnalyticsData = {
    averageResponseTime: 45,
    caseResolutionRate: 0.85,
    publicSatisfactionScore: 4.2,
    casesResolved: [
      {
        year: '2022',
        metrics: [
          { month: 'January', count: 20 },
          { month: 'February', count: 35 },
          { month: 'March', count: 55 },
          { month: 'April', count: 30 },
          { month: 'May', count: 25 },
          { month: 'June', count: 40 },
          { month: 'July', count: 20 },
          { month: 'August', count: 22 },
          { month: 'September', count: 30 },
          { month: 'October', count: 38 },
          { month: 'November', count: 25 },
          { month: 'December', count: 14 }
        ]
      },
      {
        year: '2023',
        metrics: [
          { month: 'January', count: 34 },
          { month: 'February', count: 42 },
          { month: 'March', count: 56 },
          { month: 'April', count: 44 },
          { month: 'May', count: 38 },
          { month: 'June', count: 50 },
          { month: 'July', count: 60 },
          { month: 'August', count: 48 },
          { month: 'September', count: 52 },
          { month: 'October', count: 58 },
          { month: 'November', count: 54 },
          { month: 'December', count: 62 }
        ]
      },
      {
        year: '2024',
        metrics: [
          { month: 'January', count: 40 },
          { month: 'February', count: 25 },
          { month: 'March', count: 60 },
          { month: 'April', count: 45 },
          { month: 'May', count: 35 },
        ]
      }
    ],

    /*casesResolvedPerMonth: [
      { month: 'January', count: 34 },
      { month: 'February', count: 42 },
      { month: 'March', count: 56 },
      { month: 'April', count: 44 },
      { month: 'May', count: 38 },
      { month: 'June', count: 50 },
      { month: 'July', count: 60 },
      { month: 'August', count: 48 },
      { month: 'September', count: 52 },
      { month: 'October', count: 58 },
      { month: 'November', count: 54 },
      { month: 'December', count: 62 }
    ],*/
    categoryMetrics: [
      { category: 'Street Repair', responseTime: 40, rate: 0.90 },
      { category: 'Waste Collection', responseTime: 30, rate: 0.80 },
      { category: 'Public Safety', responseTime: 50, rate: 0.85 },
      { category: 'Water Supply', responseTime: 35, rate: 0.88 },
      { category: 'Electricity Outage', responseTime: 25, rate: 0.92 },
      { category: 'Noise Complaint', responseTime: 60, rate: 0.75 },
      { category: 'Illegal Dumping', responseTime: 70, rate: 0.70 },
      { category: 'Pothole Repair', responseTime: 20, rate: 0.95 },
      { category: 'Tree Trimming', responseTime: 80, rate: 0.65 },
      { category: 'Graffiti Removal', responseTime: 45, rate: 0.85 },
      { category: 'Street Light Outage', responseTime: 55, rate: 0.90 },
      { category: 'Animal Control', responseTime: 65, rate: 0.78 },
      { category: 'Parking Violation', responseTime: 30, rate: 0.80 },
      { category: 'Public Health', responseTime: 40, rate: 0.85 },
      { category: 'Other', responseTime: 75, rate: 0.60 }
    ]
  };

  constructor(/*private gtag: Gtag, private router: Router*/) {
    /*this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.gtag.pageview({
          page_path: event.urlAfterRedirects
        });
      }
    });*/
  }

  getAnalytics(): Observable<AnalyticsData> {
    return of(this.analytics)
  }

 /* trackEvent(action: string, category: string, label: string, value?: number): void {
    this.gtag.event(action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }*/
}
