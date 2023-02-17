import axios from "axios";

const API_URL = `https://workout-planner-be.vercel.app/api/exercises`;

// Get all exercises

const getAllExercises = async () => {
  const response = await axios.get(API_URL);
  console.log(
    `get all exercises function: ${response.data.length} objects loaded`
  );
  return response.data;
};

const getFilteredExercises = async ({ group, tags, difficulty }) => {
  const response = await axios.get(
    `${API_URL}/search?group=${group}&tags=${tags}&difficulty=${difficulty}`
  );
  console.log(
    `filtering exercises function: ${response.data.length} objects loaded`
  );

  return response.data;
};

const exerciseService = { getAllExercises, getFilteredExercises };

export default exerciseService;
