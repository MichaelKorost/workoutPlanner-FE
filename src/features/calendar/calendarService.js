import axios from "axios";

const API_URL = `https://workout-planner-be.vercel.app/api/calendar/mine`;

// Get user calendar events
const getUserCalendarEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

// update user calendar events
const updateUserCalendarEvent = async (eventsData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}`,
    JSON.stringify(eventsData),
    config
  );
  return response.data;
};

const calendarService = {
  getUserCalendarEvents,
  updateUserCalendarEvent,
};
export default calendarService;