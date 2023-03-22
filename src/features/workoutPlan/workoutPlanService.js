import axios from "axios";

const API_URL = `https://workout-planner-be.vercel.app/api/workouts`;

// Get all workoutPlans
const getAllWorkoutPlans = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
};

const getWorkoutPlanById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  console.log(response.data);
  return response.data;
};

// Get user workoutPlans
const getUserWorkoutPlans = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/my`, config);
  console.log(response.data);
  return response.data;
};

// create new workoutPlan
const createWorkoutPlan = async (workoutPlanData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/create`,
    JSON.stringify(workoutPlanData),
    config
  );
  return response.data;
};

const workoutPlanService = {
  getAllWorkoutPlans,
  createWorkoutPlan,
  getUserWorkoutPlans,
  getWorkoutPlanById,
};

export default workoutPlanService;
