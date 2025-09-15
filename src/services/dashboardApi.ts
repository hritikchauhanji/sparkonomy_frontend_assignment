import type {
  FilterType,
  Stats,
  ChartData,
  CustomRange,
} from "../types/dashboard";

// Replace these with real endpoints. These functions return expected shape.
export async function fetchDashboard(
  filter: FilterType,
  customRange?: CustomRange
) {
  // Mock delay
  // await new Promise((r) => setTimeout(r, 300));

  // Real implementation: call your backend
  // const res = await fetch(`/api/dashboard?filter=${filter}`)
  // return res.json()

  // Mocked responses
  const mockStats: Record<string, Stats> = {
    "1Month": { totalEarnings: 3500, paymentAwaited: 500, paymentOverdue: 200 },
    "3Months": {
      totalEarnings: 15000,
      paymentAwaited: 2500,
      paymentOverdue: 1000,
    },
    "1Year": {
      totalEarnings: 125000,
      paymentAwaited: 25000,
      paymentOverdue: 25000,
    },
    Calendar: {
      totalEarnings: 50000,
      paymentAwaited: 10000,
      paymentOverdue: 5000,
    },
  };

  const mockChart: Record<string, ChartData[]> = {
    "1Month": [{ month: "Jun", income: 3500, momGrowth: 0 }],
    "3Months": [
      { month: "Apr", income: 3250, momGrowth: -50 },
      { month: "May", income: 5000, momGrowth: 80 },
      { month: "Jun", income: 0, momGrowth: -100 },
    ],
    "1Year": [
      { month: "Jan", income: 3500, momGrowth: 0 },
      { month: "Feb", income: 4750, momGrowth: 40 },
      { month: "Mar", income: 6750, momGrowth: 20 },
      { month: "Apr", income: 3250, momGrowth: -50 },
      { month: "May", income: 5000, momGrowth: 80 },
      { month: "Jun", income: 0, momGrowth: -100 },
    ],
    Calendar: [
      { month: "Mar", income: 6000, momGrowth: 100 },
      { month: "Apr", income: 3250, momGrowth: -50 },
      { month: "May", income: 5000, momGrowth: 80 },
    ],
  };

  return {
    stats: mockStats[filter] || mockStats["1Year"],
    chartData: mockChart[filter] || mockChart["1Year"],
    customRange: customRange || null,
  };
}
