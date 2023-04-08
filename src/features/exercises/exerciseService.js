import axios from "axios";

const API_URL = `https://workout-planner-be.vercel.app/api/exercises`;

// Get all exercises

const getAllExercises = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const getExercise = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/id/${id}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getFilteredExercises = async ({ group, tags, difficulty }) => {
  const response = await axios.get(
    `${API_URL}/search?group=${group}&tags=${tags}&difficulty=${difficulty}`
  );
  return response.data;
};

const exerciseService = { getAllExercises, getFilteredExercises, getExercise };

export default exerciseService;
