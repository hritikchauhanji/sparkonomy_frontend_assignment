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

export interface CustomRange {
  start: string; // 2025-01
  end: string; // 2025-06
}

export interface DashboardState {
  filter: FilterType;
  stats: Stats;
  statsByFilter: Record<FilterType, Stats>;
  chartData: ChartData[];
  customRange: CustomRange;
}
