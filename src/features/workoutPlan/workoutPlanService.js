import axios from "axios";

const API_URL = `https://workout-planner-be.vercel.app/api/workouts`;

// Get all workoutPlans
const getAllWorkoutPlans = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
};

// create new workoutPlan
const createWorkoutPlan = async (workoutPlanData) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const response = await axios.post(
    `${API_URL}/create`,
    JSON.stringify(workoutPlanData),
    config
  );
  return response.data;
};

const workoutPlanService = { getAllWorkoutPlans, createWorkoutPlan };

export default workoutPlanService;
