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

// Get workout plan by id

export const getWorkoutPlanById = createAsyncThunk(
  "workoutPlans/getById",
  async (id, thunkAPI) => {
    try {
      return await workoutPlanService.getWorkoutPlanById(id);
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
// save new workout from details page

export const saveNewWorkout = createAsyncThunk(
  "workoutPlans/saveNewWorkout",
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

// Update user workout plan

export const updateWorkoutPlan = createAsyncThunk(
  "workoutPlans/update",
  async (workoutPlanData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutPlanService.updateWorkoutPlan(workoutPlanData, token);
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
// Delete user workout plan

export const deleteWorkoutPlan = createAsyncThunk(
  "workoutPlans/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutPlanService.deleteWorkoutPlan(id, token);
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

// Delete user workout plan from details page

export const deleteWorkoutPlanFromDetailPage = createAsyncThunk(
  "workoutPlans/deleteFromDetailsPage",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutPlanService.deleteWorkoutPlan(id, token);
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
      })
      .addCase(getWorkoutPlanById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkoutPlanById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.workoutPlans = [action.payload];
      })
      .addCase(getWorkoutPlanById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateWorkoutPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWorkoutPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.workoutPlans = state?.workoutPlans?.map((workoutPlan) =>
          workoutPlan._id === action.payload._id ? action.payload : workoutPlan
        );
      })
      .addCase(updateWorkoutPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteWorkoutPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkoutPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.workoutPlans = state.workoutPlans.filter(
          (workoutPlan) => workoutPlan._id !== action.payload
        );
      })
      .addCase(deleteWorkoutPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteWorkoutPlanFromDetailPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkoutPlanFromDetailPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.workoutPlans = state.workoutPlans;
      })
      .addCase(deleteWorkoutPlanFromDetailPage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(saveNewWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveNewWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.workoutPlans = state.workoutPlans;
      })
      .addCase(saveNewWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = workoutPlansSlice.actions;
export default workoutPlansSlice.reducer;
