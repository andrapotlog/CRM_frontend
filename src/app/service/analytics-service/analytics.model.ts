export interface AnalyticsData {
  averageResponseTime: number;
  averageCompletionTime: number;
  caseResolutionRate: number;
  /*  publicSatisfactionScore: number;*/
  casesResolved: YearlyMetrics[];
  categoryMetrics: CategoryMetrics[];
  categoryCountMetrics: CountMetrics[];
  priorityCountMetrics: CountMetrics[];
  statusCountMetrics: CountMetrics[];
}

export interface YearlyMetrics {
  year: string;
  metrics: MonthlyMetrics[];
}

export interface MonthlyMetrics {
  month: string;
  count: number;
}

export interface CountMetrics {
  category: string;
  count: number;
}

export interface CategoryMetrics {
  category: number;
  responseTime: number;
  completionTime: number;
  rate: number;
}
