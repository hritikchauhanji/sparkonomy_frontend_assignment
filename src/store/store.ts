import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

// Infer types for dispatch & state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
