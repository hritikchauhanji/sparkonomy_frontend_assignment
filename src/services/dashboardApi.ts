import type {
  FilterType,
  Stats,
  ChartData,
  CustomRange,
  Invoice,
} from "../types/dashboard";

// utility → get date range for presets
function getDateRange(type: FilterType): CustomRange {
  const end = new Date();
  const start = new Date();

  if (type === "1Month") start.setMonth(end.getMonth() - 1);
  if (type === "3Months") start.setMonth(end.getMonth() - 3);
  if (type === "1Year") start.setFullYear(end.getFullYear() - 1);

  return { start: start.toISOString(), end: end.toISOString() };
}

// mock base chart data (full year sample)
const baseChart: ChartData[] = [
  { month: "Jan", income: 3500, momGrowth: 0 },
  { month: "Feb", income: 4750, momGrowth: 40 },
  { month: "Mar", income: 6750, momGrowth: 20 },
  { month: "Apr", income: 3250, momGrowth: -50 },
  { month: "May", income: 5000, momGrowth: 80 },
  { month: "Jun", income: 0, momGrowth: -100 },
  { month: "Jul", income: 4200, momGrowth: 30 },
  { month: "Aug", income: 6100, momGrowth: 45 },
  { month: "Sep", income: 7100, momGrowth: 15 },
  { month: "Oct", income: 8200, momGrowth: 25 },
  { month: "Nov", income: 9000, momGrowth: 10 },
  { month: "Dec", income: 7500, momGrowth: -20 },
];

// mock base invoices data
const baseInvoices: Invoice[] = [
  {
    id: 0,
    clientName: "Client Name",
    amount: 125000,
    dueDate: "2025-06-15",
    status: "Update Status",
  },
  {
    id: 1,
    clientName: "Client Name",
    amount: 125000,
    dueDate: "2025-06-15",
    status: "Unpaid",
  },
  {
    id: 2,
    clientName: "Income Trend",
    amount: 125000,
    dueDate: "2025-06-15",
    status: "Disputed",
  },
  {
    id: 3,
    clientName: "Income Trend",
    amount: 125000,
    dueDate: "2025-06-15",
    status: "Paid",
  },
  {
    id: 4,
    clientName: "Income Trend",
    amount: 125000,
    dueDate: "2025-06-15",
    status: "Partially Paid",
  },
  {
    id: 5,
    clientName: "Income Trend",
    amount: 125000,
    dueDate: "2025-06-15",
    status: "Overdue",
  },
  {
    id: 6,
    clientName: "Income Trend",
    amount: 125000,
    dueDate: "2025-06-15",
    status: "Awaited",
  },
  {
    id: 7,
    clientName: "Income Trend",
    amount: 125000,
    dueDate: "2025-06-15",
    status: "Draft",
  },
  {
    id: 8,
    clientName: "Income Trend",
    amount: 125000,
    dueDate: "2025-06-15",
    status: "Paid",
  },
];

// mock fetch function to simulate API call
export async function fetchDashboard(
  filter: FilterType,
  customRange?: CustomRange
) {
  // if no customRange provided, generate from filter
  const range = customRange || getDateRange(filter);

  const currentYear = new Date().getFullYear();
  const yearStart = new Date(currentYear, 0, 1); // Jan 1
  const yearEnd = new Date(currentYear, 11, 31); // Dec 31

  // clamp incoming range to current year
  const start =
    new Date(range.start) < yearStart ? yearStart : new Date(range.start);
  const end = new Date(range.end) > yearEnd ? yearEnd : new Date(range.end);

  // filter base chart data for current year only
  const filteredChart = baseChart.filter((d) => {
    const date = new Date(`01 ${d.month} ${currentYear}`);
    return date >= start && date <= end;
  });

  // calculate stats dynamically
  const totalEarnings = filteredChart.reduce((sum, d) => sum + d.income, 0);
  const paymentAwaited = Math.round(totalEarnings * 0.15); // mock: 15% pending
  const paymentOverdue = Math.round(totalEarnings * 0.1); // mock: 10% overdue

  return {
    stats: {
      totalEarnings,
      paymentAwaited,
      paymentOverdue,
    } as Stats,
    chartData: filteredChart,
    customRange: { start: start.toISOString(), end: end.toISOString() },
  };
}

export async function fetchInvoices(
  customRange?: CustomRange
): Promise<Invoice[]> {
  // simulate API delay
  // await new Promise((r) => setTimeout(r, 300));

  const currentYear = new Date().getFullYear();
  const yearStart = new Date(currentYear, 0, 1);
  const yearEnd = new Date(currentYear, 11, 31);

  const start = customRange ? new Date(customRange.start) : yearStart;
  const end = customRange ? new Date(customRange.end) : yearEnd;

  // clamp range to current year
  const rangeStart = start < yearStart ? yearStart : start;
  const rangeEnd = end > yearEnd ? yearEnd : end;

  // filter invoices within range
  const filtered = baseInvoices.filter((inv) => {
    const dueDate = new Date(inv.dueDate);
    return dueDate >= rangeStart && dueDate <= rangeEnd;
  });

  return filtered;
}
