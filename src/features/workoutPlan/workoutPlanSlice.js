import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import workoutPlanService from "./workoutPlanService";

const initialState = {
  workoutPlans: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all workout plans

export const getAllWorkoutPlans = createAsyncThunk(
  "workoutPlans/getAll",
  async (_, thunkAPI) => {
    try {
      return await workoutPlanService.getAllWorkoutPlans();
    } catch (error) {
      console.log(error);
    }
  }
);

export const workoutPlansSlice = createSlice({
  name: "workoutPlans",
  initialState,
  reducers: {
    reset: (reset) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorkoutPlans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWorkoutPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.workoutPlans = action.payload;
      })
      .addCase(getAllWorkoutPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = workoutPlansSlice.actions;
export default workoutPlansSlice.reducer;
