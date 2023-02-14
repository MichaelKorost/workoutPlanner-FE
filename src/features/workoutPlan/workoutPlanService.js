import axios from "axios";

const API_URL = `https://workout-planner-be.vercel.app/api/workouts`;

// Get all workoutPlans
const getAllWorkoutPlans = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
};

const workoutPlanService = { getAllWorkoutPlans };

export default workoutPlanService;
