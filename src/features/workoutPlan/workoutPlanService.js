import axios from "axios";

const API_URL = `https://workout-planner-be.vercel.app/api/workouts`;

// Get all workoutPlans
const getAllWorkoutPlans = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getWorkoutPlanById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
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

// update user workoutPlan
const updateWorkoutPlan = async (workoutPlanData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/${workoutPlanData._id}`,
    JSON.stringify(workoutPlanData),
    config
  );
  return response.data;
};
// Delete user workoutPlan
const deleteWorkoutPlan = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const workoutPlanService = {
  getAllWorkoutPlans,
  createWorkoutPlan,
  getUserWorkoutPlans,
  getWorkoutPlanById,
  updateWorkoutPlan,
  deleteWorkoutPlan,
};

export default workoutPlanService;
