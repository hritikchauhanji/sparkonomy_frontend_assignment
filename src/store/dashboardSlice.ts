import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  DashboardState,
  Stats,
  ChartData,
  FilterType,
} from "../types/dashboard";

const initialState: DashboardState = {
  filter: "1 year",
  stats: {
    totalEarnings: 125000,
    paymentAwaited: 25000,
    paymentOverdue: 25000,
  },
  statsByFilter: {
    "1 month": {
      totalEarnings: 3500,
      paymentAwaited: 500,
      paymentOverdue: 200,
    },
    "3 months": {
      totalEarnings: 15000,
      paymentAwaited: 2500,
      paymentOverdue: 1000,
    },
    "1 year": {
      totalEarnings: 125000,
      paymentAwaited: 25000,
      paymentOverdue: 25000,
    },
    Calendar: {
      totalEarnings: 50000,
      paymentAwaited: 10000,
      paymentOverdue: 5000,
    },
  },
  chartData: [
    { month: "Jan", income: 3500, momGrowth: 0 },
    { month: "Feb", income: 4750, momGrowth: 40 },
    { month: "Mar", income: 6750, momGrowth: 20 },
    { month: "Apr", income: 3250, momGrowth: -50 },
    { month: "May", income: 5000, momGrowth: 80 },
    { month: "Jun", income: 0, momGrowth: -100 },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    setStats: (state, action: PayloadAction<Stats>) => {
      state.stats = action.payload;
    },
    setChartData: (state, action: PayloadAction<ChartData[]>) => {
      state.chartData = action.payload;
    },
  },
});

export const { setFilter, setStats, setChartData } = dashboardSlice.actions;
export default dashboardSlice.reducer;

// {
//   "1Month": { totalEarnings: 3500, paymentAwaited: 500, paymentOverdue: 200 }
// }
