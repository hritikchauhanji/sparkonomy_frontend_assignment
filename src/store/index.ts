import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";

// --- Load persisted state ---
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("dashboardState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// --- Save state ---
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("dashboardState", serializedState);
  } catch (err) {
    // ignore write errors
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
  preloadedState: {
    dashboard: preloadedState || undefined,
  },
});

store.subscribe(() => {
  saveState(store.getState().dashboard);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
