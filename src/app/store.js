import { configureStore } from "@reduxjs/toolkit";
import workoutPlanReducer from "../features/workoutPlan/workoutPlanSlice";
import authReducer from "../features/auth/authSlice";
import exerciseReducer from "../features/exercises/exerciseSlice";
import calendarReducer from "../features/calendar/calendarSlice";
export const store = configureStore({
  reducer: {
    workoutPlan: workoutPlanReducer,
    auth: authReducer,
    exercise: exerciseReducer,
    calendar: calendarReducer,
  },
});
