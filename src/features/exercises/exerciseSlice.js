import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import workoutPlanService from "./workoutPlanService";
import exerciseService from "./exerciseService";

const initialState = {
  exercises: [],
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
      console.log(error);
    }
  }
);

// get filtered exercises

export const getFilteredExercises = createAsyncThunk(
  "exercises/getFilteredExercises",
  async (selectedCheckboxes, thunkAPI) => {
    try {
      const searchFilters = {
        group: selectedCheckboxes?.group.join(","),
        tags: selectedCheckboxes?.tags.join(","),
        difficulty: selectedCheckboxes?.difficulty.join(","),
      };
      return await exerciseService.getFilteredExercises(searchFilters);
    } catch (error) {
      console.log(error);
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
      });
  },
});

export const { reset } = exercisesSlice.actions;
export default exercisesSlice.reducer;
