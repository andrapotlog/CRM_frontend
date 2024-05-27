export interface AnalyticsData {
  averageResponseTime: number;
  caseResolutionRate: number;
  publicSatisfactionScore: number;
  casesResolved: {
    year: string,
    metrics: AnalyticsPerMonth[];
  }[];
  categoryMetrics: { category: string, responseTime: number, rate: number }[];
}

export interface AnalyticsPerMonth {
  month: string;
  count: number;
}
