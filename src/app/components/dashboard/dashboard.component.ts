import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AnalyticsData } from '../../service/analytics-service/analytics.model';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';
import { AnalyticsService } from '../../service/analytics-service/analytics.service';
import {
  Chart,
  ChartDataset,
  ChartOptions,
  ChartType,
  registerables,
} from 'chart.js';
import { PdfGeneratorService } from '../../service/pdf-generator-service/pdf-generator.service';
import { SharedService } from '../../service/shared-service/shared.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  takeUntil$: Subject<void> = new Subject<void>();

  analyticsData$: Observable<AnalyticsData>;
  barChartLabels$: Observable<string[]> = of([]);
  barChartData$: Observable<ChartDataset<'bar', number[]>[]>;
  categoryMetricsData$: Observable<
    { category: string; responseTime: string; rate: string }[]
  > = of();
  barChartType: ChartType = 'bar';

  categoryChartLabels$: Observable<string[]> = of();
  categoryResponseTimeData$: Observable<ChartDataset<'pie', number[]>[]> = of();
  categoryResolutionRateData$: Observable<ChartDataset<'pie', number[]>[]> =
    of();

  categoryCountData$: Observable<ChartDataset<'pie', number[]>[]> = of();
  priorityCountData$: Observable<ChartDataset<'pie', number[]>[]> = of();
  priorityCountLabels$: Observable<string[]> = of();

  statusCountData$: Observable<ChartDataset<'pie', number[]>[]> = of();
  statusCountLabels$: Observable<string[]> = of();
  categoryChartType: ChartType = 'bar';

  combinedCategoryData$: Observable<ChartDataset[]> = of();

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(
    private analyticsService: AnalyticsService,
    private sharedService: SharedService,
    private pdfGeneratorService: PdfGeneratorService,
  ) {
    this.analyticsData$ = this.analyticsService
      .getAnalytics()
      .pipe(takeUntil(this.takeUntil$));

    this.barChartData$ = this.analyticsData$.pipe(
      map((data) =>
        data.casesResolved.map((yearData) => ({
          data: yearData.metrics.map((metric) => metric.count),
          label: yearData.year,
          fill: true,
          tension: 0.4,
        })),
      ),
    );

    this.barChartLabels$ = this.analyticsData$.pipe(
      map((data) =>
        data.casesResolved
          .filter((item) => item.year === '2024')[0]
          .metrics.map((item) => item.month),
      ),
    );

    this.categoryMetricsData$ = this.analyticsData$.pipe(
      map((data) =>
        data.categoryMetrics.map((item) => ({
          category: this.sharedService.getTypeLabel(item.category),
          responseTime: item.responseTime + ' hours',
          completionTime: item.completionTime + ' hours',
          rate: (item.rate * 100).toFixed(2) + '%',
        })),
      ),
    );

    this.categoryChartLabels$ = this.categoryMetricsData$.pipe(
      map((metrics) => metrics.map((metric) => metric.category)),
    );

    this.categoryResponseTimeData$ = this.analyticsData$.pipe(
      map((data) => [
        {
          data: data.categoryMetrics.map((item) => item.responseTime),
          label: 'Average Response Time (minutes)',
        },
      ]),
    );

    this.categoryResolutionRateData$ = this.analyticsData$.pipe(
      map((data) => [
        {
          data: data.categoryMetrics.map((item) => item.rate * 100),
          label: 'Resolution Rate (%)',
        },
      ]),
    );

    this.combinedCategoryData$ = this.analyticsData$.pipe(
      map((data) => [
        {
          data: data.categoryMetrics.map((item) => item.responseTime),
          label: 'Average Response Time (hours)',
          type: 'bar',
        },
        {
          data: data.categoryMetrics.map((item) => item.completionTime),
          label: 'Average Response Time (hours)',
          type: 'bar',
        },
        {
          data: data.categoryMetrics.map((item) => item.rate * 100),
          label: 'Resolution Rate (percentage)',
          type: 'line',
        },
      ]),
    );

    this.categoryCountData$ = this.analyticsData$.pipe(
      map((data) => [
        {
          data: data.categoryCountMetrics.map((item) => item.count),
          label: 'Count',
        },
      ]),
    );

    this.priorityCountData$ = this.analyticsData$.pipe(
      map((data) => [
        {
          data: data.priorityCountMetrics.map((item) => item.count),
          label: 'Count',
        },
      ]),
    );

    this.priorityCountLabels$ = this.analyticsData$.pipe(
      map((data) => data.priorityCountMetrics.map((item) => item.category)),
    );

    this.statusCountData$ = this.analyticsData$.pipe(
      map((data) => [
        {
          data: data.statusCountMetrics.map((item) => item.count),
          label: 'Count',
        },
      ]),
    );

    this.statusCountLabels$ = this.analyticsData$.pipe(
      map((data) => data.statusCountMetrics.map((item) => item.category)),
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.takeUntil$.complete();
  }

  toggleChart() {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  downloadPdf(): void {
    this.pdfGeneratorService.downloadPdf('dashboard-content', 'dashboard.pdf');
  }
}
