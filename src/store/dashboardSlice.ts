import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  DashboardState,
  FilterType,
  CustomRange,
} from "../types/dashboard";
import { fetchDashboard } from "../services/dashboardApi";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async ({
    filter,
    customRange,
  }: {
    filter: FilterType;
    customRange?: CustomRange;
  }) => {
    const res = await fetchDashboard(filter, customRange);
    return { filter, ...res };
  }
);

const initialState: DashboardState = {
  filter: "1Year",
  stats: {
    totalEarnings: 0,
    paymentAwaited: 0,
    paymentOverdue: 0,
  },
  statsByFilter: {},
  chartData: [],
  chartDataByFilter: {},
  customRange: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    // setStats: (state, action: PayloadAction<Stats>) => {
    //   state.stats = action.payload;
    // },
    // setChartData: (state, action: PayloadAction<ChartData[]>) => {
    //   state.chartData = action.payload;
    // },
    setCustomRange: (state, action: PayloadAction<CustomRange | null>) => {
      state.customRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        const { filter, stats, chartData, customRange } = action.payload;
        state.stats = stats;
        state.chartData = chartData;
        state.statsByFilter[filter] = stats;
        state.chartDataByFilter[filter] = chartData;
        state.customRange = customRange || null;
        state.loading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch dashboard data";
      });
  },
});

// export const { setFilter, setStats, setChartData } = dashboardSlice.actions;
export const { setFilter, setCustomRange } = dashboardSlice.actions;
export default dashboardSlice.reducer;
