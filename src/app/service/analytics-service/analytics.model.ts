export interface AnalyticsData {
  averageResponseTime: number;
  caseResolutionRate: number;
  publicSatisfactionScore: number;
  casesResolvedPerMonth: { month: string, count: number }[];
  categoryMetrics: { category: string, responseTime: number, rate: number }[];
}
