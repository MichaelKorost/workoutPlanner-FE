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

// Get user workout plans

export const getUserWorkoutPlans = createAsyncThunk(
  "workoutPlans/getuser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutPlanService.getUserWorkoutPlans(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new workout plan

export const createWorkoutPlan = createAsyncThunk(
  "workoutPlans/create",
  async (workoutPlanData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutPlanService.createWorkoutPlan(workoutPlanData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
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
      })
      .addCase(createWorkoutPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkoutPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.workoutPlans.push(action.payload);
      })
      .addCase(createWorkoutPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getUserWorkoutPlans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWorkoutPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.workoutPlans = action.payload;
      })
      .addCase(getUserWorkoutPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = workoutPlansSlice.actions;
export default workoutPlansSlice.reducer;
