import {Component, OnInit} from '@angular/core';
import {AnalyticsData} from "../../service/analytics-service/analytics.model";
import {map, Observable, of} from "rxjs";
import {AnalyticsService} from "../../service/analytics-service/analytics.service";
import _default from "chart.js/dist/core/core.interaction";
import dataset = _default.modes.dataset;
import {Chart, ChartDataset, ChartType, registerables} from "chart.js";

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  analyticsData$: Observable<AnalyticsData>;
 // barChartData: ChartDataset<'bar', number[]>[];
  barChartLabels$: Observable<string[]>;
  //barChartData$: Observable<{ data: number[], label: string }[]>;
  barChartData$: Observable<ChartDataset<'bar', number[]>[]>;
  categoryMetricsData$: Observable<{ category: string, responseTime: string, rate: string }[]>;
  barChartType: ChartType = 'bar';

  categoryChartLabels$: Observable<string[]>;
  categoryResponseTimeData$: Observable<ChartDataset<'pie', number[]>[]>;
  categoryResolutionRateData$: Observable<ChartDataset<'pie', number[]>[]>;
  categoryChartType: ChartType = 'bar';

  constructor(private analyticsService: AnalyticsService) {
    this.analyticsData$ = this.analyticsService.getAnalytics();

    this.barChartData$ = this.analyticsData$.pipe(
      map(data => [
        { data: data.casesResolvedPerMonth.map(item => item.count), label: 'Cases Resolved' }
      ] as ChartDataset<'bar', number[]>[])
    );

    this.barChartLabels$ = this.analyticsData$.pipe(
      map(data => data.casesResolvedPerMonth.map(item => item.month))
    )

    this.categoryMetricsData$ = this.analyticsData$.pipe(
      map(data => data.categoryMetrics.map(item => ({
        category: item.category,
        responseTime: item.responseTime + ' minutes',
        rate: (item.rate * 100).toFixed(2) + '%'
      })))
    )

    this.categoryChartLabels$ = this.categoryMetricsData$.pipe(
      map(metrics => metrics.map(metric => metric.category))
    )

    this.categoryResponseTimeData$ = this.analyticsData$.pipe(
      map(data =>  [{
        data: data.categoryMetrics.map(item => item.responseTime),
        label: 'Average Response Time (minutes)'
      }])
    )

    this.categoryResolutionRateData$ = this.analyticsData$.pipe(
      map(data =>  [{
        data: data.categoryMetrics.map(item => item.rate * 100),
        label: 'Resolution Rate (%)'
      }])
    )

  }

  ngOnInit(): void {
    this.barChartData$.subscribe(res=>console.log(res))
    this.barChartLabels$.subscribe(res=>console.log(res))
    this.categoryMetricsData$.subscribe(res=>console.log(res))
  }

}
