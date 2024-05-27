import {Component, OnInit} from '@angular/core';
import {AnalyticsData} from "../../service/analytics-service/analytics.model";
import {filter, map, Observable, of} from "rxjs";
import {AnalyticsService} from "../../service/analytics-service/analytics.service";
import _default from "chart.js/dist/core/core.interaction";
import dataset = _default.modes.dataset;
import {Chart, ChartDataset, ChartType, registerables} from "chart.js";
import {PdfGeneratorService} from "../../service/pdf-generator-service/pdf-generator.service";

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

  combinedCategoryData$: Observable<ChartDataset<'pie', number[]>[]>;

  constructor(private analyticsService: AnalyticsService, private pdfGeneratorService: PdfGeneratorService) {
    this.analyticsData$ = this.analyticsService.getAnalytics();

    this.barChartData$ = this.analyticsData$.pipe(
      map(data => data.casesResolved.map(yearData => ({
        data: yearData.metrics.map(metric => metric.count),
        label: yearData.year,
        fill: true,
        tension: 0.4
      }))
    ));

    this.barChartLabels$ = this.analyticsData$.pipe(
      map(data => data.casesResolved
        .filter(item => item.year === '2023')[0].metrics
        .map(item => item.month)
      )
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

    this.combinedCategoryData$ = this.analyticsData$.pipe(
      map(data => [
        {
          data: data.categoryMetrics.map(item => item.responseTime),
          label: 'Average Response Time (minutes)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          data: data.categoryMetrics.map(item => item.rate * 100),
          label: 'Resolution Rate (%)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ])
    )

  }

  ngOnInit(): void {
    this.barChartData$.subscribe(res=>console.log(res))
    this.barChartLabels$.subscribe(res=>console.log(res))
    this.categoryMetricsData$.subscribe(res=>console.log(res))
  }

  toggleChart() {
      this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  downloadPdf(): void {
    this.pdfGeneratorService.downloadPdf('dashboard-content', 'dashboard.pdf');
  }
}
