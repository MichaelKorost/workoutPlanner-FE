import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import workoutPlanService from "./workoutPlanService";
import exerciseService from "./exerciseService";

const initialState = {
  exercises: [],
  exercise: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all exercises

export const getAllExercises = createAsyncThunk(
  "exercises/getAll",
  async (_, thunkAPI) => {
    try {
      return await exerciseService.getAllExercises();
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

// get exercise
export const getExercise = createAsyncThunk(
  "exercises/getOne",
  async (id, thunkAPI) => {
    try {
      return await exerciseService.getExercise(id);
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

// get filtered exercises

export const getFilteredExercises = createAsyncThunk(
  "exercises/getFilteredExercises",
  async ({ group = [], tags = [], difficulty = [] } = {}, thunkAPI) => {
    try {
      const searchFilters = {
        group: group.join(","),
        tags: tags.join(","),
        difficulty: difficulty.join(","),
      };
      return await exerciseService.getFilteredExercises(searchFilters);
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

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    reset: (reset) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllExercises.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.exercises = action.payload;
      })
      .addCase(getAllExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getFilteredExercises.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.exercises = action.payload;
      })
      .addCase(getFilteredExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.exercise = action.payload;
      })
      .addCase(getExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = exercisesSlice.actions;
export default exercisesSlice.reducer;
