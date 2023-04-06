import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import calendarService from "./calendarService";

const initialState = {
  userCalendarEvents: [],
  isCalendarError: false,
  isCalendarSuccess: false,
  isCalendarLoading: false,
  calendarMessage: "",
};

// get user calendar events

export const getUserCalendarEvents = createAsyncThunk(
  "calendarEvents/getUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await calendarService.getUserCalendarEvents(token);
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

export const updateCalendarEvents = createAsyncThunk(
  "calendarEvents/updateUserEvents",
  async (eventsData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await calendarService.updateUserCalendarEvent(eventsData, token);
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

export const calendarSlice = createSlice({
  name: "calendarEvents",
  initialState,
  reducers: {
    resetCalendar: (reset) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCalendarEvents.pending, (state) => {
        state.isCalendarLoading = true;
      })
      .addCase(getUserCalendarEvents.fulfilled, (state, action) => {
        state.isCalendarLoading = false;
        state.isCalendarError = false;
        state.isCalendarSuccess = true;
        state.userCalendarEvents = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(getUserCalendarEvents.rejected, (state, action) => {
        state.isCalendarLoading = false;
        state.isCalendarError = true;
        state.isCalendarSuccess = false;
        state.calendarMessage = action.payload;
      })
      .addCase(updateCalendarEvents.pending, (state) => {
        state.isCalendarLoading = true;
      })
      .addCase(updateCalendarEvents.fulfilled, (state, action) => {
        state.isCalendarLoading = false;
        state.isCalendarError = false;
        state.isCalendarSuccess = true;
        state.userCalendarEvents = action.payload;
      })
      .addCase(updateCalendarEvents.rejected, (state, action) => {
        state.isCalendarLoading = false;
        state.isCalendarError = true;
        state.isCalendarSuccess = false;
        state.calendarMessage = action.payload;
      });
  },
});

export const { resetCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;
