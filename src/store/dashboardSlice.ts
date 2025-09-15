import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  DashboardState,
  FilterType,
  CustomRange,
  Invoice,
  InvoiceStatus,
} from "../types/dashboard";
import { fetchDashboard, fetchInvoices } from "../services/dashboardApi";

// Fetch Dashboard Data
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

// Fetch Invoices
export const fetchInvoicesData = createAsyncThunk(
  "dashboard/fetchInvoicesData",
  async ({
    customRange,
  }: {
    customRange?: CustomRange;
  }): Promise<Invoice[]> => {
    const res = await fetchInvoices(customRange);
    return res;
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
  invoices: [],
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
    updateInvoiceStatus: (
      state,
      action: PayloadAction<{ id: number; status: InvoiceStatus }>
    ) => {
      const { id, status } = action.payload;
      const invoice = state.invoices.find((inv) => inv.id === id);
      if (invoice) {
        invoice.status = status;
      }
    },
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
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
      })
      .addCase(fetchInvoicesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoicesData.fulfilled, (state, action) => {
        state.invoices = action.payload;
        state.loading = false;
      })
      .addCase(fetchInvoicesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch invoices";
      });
  },
});

// export const { setFilter, setStats, setChartData } = dashboardSlice.actions;
export const { setFilter, setCustomRange, updateInvoiceStatus, addInvoice } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
