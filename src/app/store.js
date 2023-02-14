import { configureStore } from "@reduxjs/toolkit";
import workoutPlanReducer from "../features/workoutPlan/workoutPlanSlice";
import authReducer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    workoutPlan: workoutPlanReducer,
    auth: authReducer,
  },
});
