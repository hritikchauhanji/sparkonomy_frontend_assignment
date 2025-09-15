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

export type InvoiceStatus =
  | "Update Status"
  | "Paid"
  | "Unpaid"
  | "Partially Paid"
  | "Awaited"
  | "Overdue"
  | "Draft"
  | "Disputed";

export interface Invoice {
  id: number;
  clientName: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
}

export interface DashboardState {
  error: string | null;
  loading: boolean;
  filter: FilterType;
  stats: Stats | null;
  statsByFilter: Partial<Record<FilterType, Stats>>;
  chartData: ChartData[];
  chartDataByFilter: Partial<Record<FilterType, ChartData[]>>;
  customRange?: CustomRange | null;
  invoices: Invoice[];
}
