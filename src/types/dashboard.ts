export type FilterType = "1Month" | "3Months" | "1Year" | "Calendar";

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
  start: string;
  end: string;
}

export interface DashboardState {
  error: string | null;
  loading: boolean;
  filter: FilterType;
  stats: Stats;
  statsByFilter: Partial<Record<FilterType, Stats>>;
  chartData: ChartData[];
  chartDataByFilter: Partial<Record<FilterType, ChartData[]>>;
  customRange?: CustomRange | null;
}
