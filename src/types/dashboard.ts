export type FilterType = "1 month" | "3 months" | "1 year" | "Calendar";

export interface Stats {
  totalEarnings: number;
  paymentAwaited: number;
  paymentOverdue: number;
}

export interface ChartData {
  month: string;
  income: number;
  momGrowth: number;
}

export interface DashboardState {
  filter: FilterType;
  stats: Stats;
  statsByFilter: Record<FilterType, Stats>;
  chartData: ChartData[];
}
