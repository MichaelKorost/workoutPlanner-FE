import "./UserWorkout.scss";

import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAllWorkoutPlans,
  reset,
  getUserWorkoutPlans,
} from "../../features/workoutPlan/workoutPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function UserWorkouts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { workoutPlans, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.workoutPlan
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else if (user.token) {
      dispatch(getUserWorkoutPlans());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="workouts-container">
      {Array.isArray(workoutPlans) && workoutPlans.map((workout) => {
        return <WorkoutCard key={workout._id} workout={workout} />;
      })}
    </div>
  );
}

export default UserWorkouts;
